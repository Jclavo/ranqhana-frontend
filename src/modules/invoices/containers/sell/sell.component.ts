import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

//MODELS
import { SellInvoice, InvoiceDetail, SearchItem, Invoice } from '../../models';
import { Item, SearchItemOptions } from '@modules/items/models';
import { ItemType } from '@modules/item-types/models';
import { StockType } from '@modules/stock-types/models';
import { InvoiceType } from '@modules/invoice-types/models';
import { FormMessage } from "@modules/utility/models";
import { Order } from "@modules/orders/models";

//SERVICES
import { ItemService } from "@modules/items/services";
import { AuthService } from "@modules/auth/services";
import { NotificationService, LanguageService, UtilityService } from '@modules/utility/services';

//UTILS
import { InvoiceUtils } from "../../utils/invoiceUtils";
import { FormUtils, CustomValidator } from "@modules/utility/utils";


@Component({
  selector: 'sb-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {

  public INVOICE_TYPE_SELL = InvoiceType.getForSell();

  public searchItemOptions = new SearchItemOptions();
  public searchItem = new SearchItem();

  public order = new Order();

  public items: Array<Item> = [];
  public hasBarcodeScanner: boolean = false;

  addItemForm: FormGroup = this.formBuilder.group({
    searchItem: ['', [Validators.required]],
    barcode: [''],
    unit: [''],
    stock: [''],
    price: ['', CustomValidator.validateGreaterThanZero],
    quantity: [0, [Validators.required, CustomValidator.validateGreaterThanZero, CustomValidator.validateDecimalNumbers, Validators.maxLength(5)]]
  });

  private errorsListForm: Array<FormMessage> = [];

  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    public authService: AuthService,
    private notificationService: NotificationService,
    public invoiceUtils: InvoiceUtils,
    private languageService: LanguageService,
    private utilityService: UtilityService,
    public formUtils: FormUtils,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {

    this.hasBarcodeScanner = this.authService.getCompanySettingHasBarcodeScanner();

    this.invoiceUtils.setHasInvoice(false);
    this.invoiceUtils.checkIsOrder();
    //reset values
    this.invoiceUtils.invoice = new SellInvoice();
    this.invoiceUtils.invoiceDetails = [];

    this.invoiceUtils.setInvoiceID(Number(this.activatedRoute.snapshot.paramMap.get('invoice_id')) ?? 0);
    if (this.invoiceUtils.getInvoiceID() > 0) {

      this.invoiceUtils.getInvoice(this.invoiceUtils.getInvoiceID());
      this.invoiceUtils.getInvoiceDetails(this.invoiceUtils.getInvoiceID());

      this.invoiceUtils.getOrder(Number(this.activatedRoute.snapshot.paramMap.get('order_id')) ?? 0);
    }

    this.invoiceUtils.invoice.discount_percent = this.authService.getCompanyHasDiscountPercent();

  }

  formatter = (item: Item) => item.name;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(searchValue =>
        this.getItems(searchValue)
      )
    )

  onChangeBarcode() {
    let barcode = this.addItemForm.value.barcode;

    if (barcode.length == 8) {
      this.getItemsByBarcode(barcode);
    }

  }

  getItems(searchValue: string) {

    this.searchItemOptions.searchValue = searchValue; // Assign value to search
    this.searchItemOptions.barcode = false; // Assign value to search
    this.searchItemOptions.stock_type_id = StockType.getForSell();

    return this.itemService.get(this.searchItemOptions).pipe(
      map(response => {

        if (response.status) {
          this.items = response.result;
          return this.items;
        } else {
          this.notificationService.error(response.message);
          return []
        }
      }, (error: any) => {
        this.notificationService.error(error);
        this.authService.raiseError();
      }))
  }

  getItemsByBarcode(searchValue: string) {

    this.searchItemOptions.searchValue = searchValue; // Assign value to search
    this.searchItemOptions.barcode = true; // to check if the search is by barcode
    this.searchItemOptions.stock_type_id = StockType.getForSell();

    this.itemService.get(this.searchItemOptions).subscribe(response => {

      if (response.status) {
        this.items = response.result;

        if (this.items?.length > 0) {
          this.addItemForm.controls['searchItem'].setValue(this.items[0]);
          this.assignSearchItemToForm();
          this.addItem();
        }else{
          this.notificationService.error(this.languageService.getI18n('item.message.notFound'));
          this.addItemForm.reset();
        }

      } else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });

  }

  assignSearchItemToForm() {

    this.addItemForm.controls['searchItem'].setValue(this.calculateStock(this.addItemForm.value.searchItem));
    this.addItemForm.controls['price'].setValue(this.formUtils.customToFixed(this.addItemForm.value.searchItem.price));
    this.addItemForm.controls['unit'].setValue(this.addItemForm.value.searchItem.unit);

    this.addItemForm.value.searchItem.stocked ? this.addItemForm.controls['stock'].setValue(this.addItemForm.value.searchItem.stock)
                                              : this.addItemForm.controls['stock'].setValue('-');
    

    if (this.addItemForm.value.searchItem.type_id == ItemType.getForService()) {
      this.addItemForm.controls['unit'].setValue('-');
      this.addItemForm.controls['stock'].setValue('-');
    }

    // this.addItemForm.controls['barcode'].setValue(this.addItemForm.value.barcode);
    // Check is allow decimal 
    // if (this.addItemForm.value.searchItem.stock > 0) {
      this.addItemForm.controls['quantity'].setValue(1);
    // }
  }

  calculateStock(searchItem: SearchItem): SearchItem {

    //Check if the item has already exist in the list
    let indexSellItem = this.invoiceUtils.invoiceDetails.findIndex(value => value.item_id == searchItem.id);

    if (indexSellItem >= 0 && searchItem.stocked) {
      searchItem.stock = searchItem.stock - this.invoiceUtils.invoiceDetails[indexSellItem].quantity;
    }

    return searchItem;

  }

  getFormValues() {

    let searchItem = new SearchItem();

    searchItem = FormUtils.moveFormValuesToModel(this.addItemForm.value.searchItem, searchItem);

    //Other values
    searchItem.quantity = Number(this.addItemForm.value?.quantity);

    return searchItem;
  }

  addItem() {

    if (this.addItemForm.invalid) {
      this.errorsListForm = this.utilityService.getFormError(this.addItemForm);
      if (this.errorsListForm.length > 0) {
        this.errorsListForm[0].setKey(this.languageService.getI18n('invoice.field.' + this.errorsListForm[0].getKey()));
        this.notificationService.error(this.errorsListForm[0].getMessage());
      }
      return;
    }

    this.searchItem = this.getFormValues();

    // check the stock
    if (this.searchItem.type_id == ItemType.getForProduct() && this.searchItem.stocked && this.searchItem.quantity > this.searchItem.stock) {
      this.notificationService.error(this.languageService.getI18n('invoice.message.nostock'));
      return;
    }

    //Check if the item UNIT allows DECIMAL number
    if (!this.invoiceUtils.unitAllowDecimal(this.searchItem)) return;


    this.invoiceUtils.create(InvoiceType.getForSell(), this.searchItem);

    this.searchItem = new SearchItem();
    this.addItemForm.reset();

  }

}
