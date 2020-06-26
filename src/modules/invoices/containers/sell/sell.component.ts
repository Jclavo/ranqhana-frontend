import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

//MODELS
import { Item, SearchItemOptions } from '@modules/items/models';
import { SellInvoice, InvoiceDetail, SearchItem } from '../../models';

//SERVICES
import { ItemService } from "@modules/items/services";
import { AuthService } from "@modules/auth/services";
import { NotificationService } from '@modules/utility/services';

//UTILS
import { InvoiceUtils } from "../../utils/invoiceUtils";
import { FormUtils, CustomValidator } from "@modules/utility/utils";


@Component({
  selector: 'sb-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {

  public searchItemOptions = new SearchItemOptions();
  public searchItem = new SearchItem();
  public sellInvoice = new SellInvoice();

  public items: Array<Item> = [];
  public invoiceDetails: Array<InvoiceDetail> = [];

  public invoiceDetailTotalItems: number = 0;
  public invoiceDetailTotalItemsOK: number = 0;

  addItemForm: FormGroup = this.formBuilder.group({
    searchItem: ['', [Validators.required]],
    unit: [''],
    stock: [''],
    price: [''],
    quantity: [0, [Validators.required, CustomValidator.validatePositiveNumbers, Validators.maxLength(5)]]
  });

  private errorsListForm: Array<string> = [];

  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private invoiceUtils: InvoiceUtils,

  ) { }

  ngOnInit(): void {
    // this.openModalAdditionalInfo();
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

  getItems(searchValue: string) {

    this.searchItemOptions.searchValue = searchValue;
    this.searchItemOptions.invoice_type_id = this.sellInvoice.getTypeForSell();

    return this.itemService.get(this.searchItemOptions).pipe(
      map(response => {

        if (response.status) {
          this.items = response.result;
          return this.items;
        } else {
          return []
        }
      }, (error: any) => {
        this.notificationService.error(error);
        this.authService.raiseError();
      }))
  }

  assignSearchItemToForm() {

    this.addItemForm.controls['searchItem'].setValue(this.calculateStock(this.addItemForm.value.searchItem));

    this.addItemForm.controls['unit'].setValue(this.addItemForm.value.searchItem.unit);
    this.addItemForm.controls['price'].setValue(this.addItemForm.value.searchItem.price);
    this.addItemForm.controls['stock'].setValue(this.addItemForm.value.searchItem.stock);

  }

  calculateStock(searchItem: SearchItem): SearchItem {

    //Check if the item has already exist in the list
    let indexSellItem = this.invoiceDetails.findIndex(value => value.item_id == searchItem.id);

    if (indexSellItem >= 0 && searchItem.stocked) {
      searchItem.stock = searchItem.stock - this.invoiceDetails[indexSellItem].quantity;
    }

    return searchItem;

  }

  getFormValues() {

    let searchItem = new SearchItem();

    searchItem = FormUtils.moveFormValuesToModel(this.addItemForm.value.searchItem, searchItem);

    //Other values
    searchItem.quantity = Number(this.addItemForm.value.quantity);

    return searchItem;
  }

  addItem() {

    if (this.addItemForm.invalid) {
      this.errorsListForm = FormUtils.getFormError(this.addItemForm);
      this.notificationService.error(this.errorsListForm[0]);
      return;
    }

    this.searchItem = this.getFormValues();

    // check the stock
    if (this.searchItem.stocked && this.searchItem.quantity > this.searchItem.stock) {
      this.notificationService.error("There is not stock for this quantity");
      return;
    }

    //Check if the item UNIT allows DECIMAL number
    if (!this.invoiceUtils.unitAllowDecimal(this.searchItem)) return;

    this.invoiceDetails = this.invoiceUtils.addInvoiceDetail(this.searchItem, this.invoiceDetails);

    this.searchItem = new SearchItem();
    this.addItemForm.reset()

    // Calculate final values for sellInvoice
    this.calculateInvoice();

  }

  delete(index: number) {
    
    this.invoiceDetails = this.invoiceUtils.delete(index, this.invoiceDetails);
    this.calculateInvoice();
  }

  calculateInvoice() {

    this.sellInvoice = this.invoiceUtils.calculateInvoice(this.sellInvoice, this.invoiceDetails);

    // this.invoiceForm = this.moveModelValuesToForm(this.invoiceForm, this.sellInvoice);

  }

  calculateDiscount() {

    this.sellInvoice = this.invoiceUtils.calculateDiscount(this.sellInvoice);

  }

  save() {

    this.sellInvoice.setTypeForSell();
    this.invoiceUtils.create(this.sellInvoice, this.invoiceDetails);

  }

}
