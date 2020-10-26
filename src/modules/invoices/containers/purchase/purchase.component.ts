import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'

//MODELS
import { Item, SearchItemOptions } from '@modules/items/models';
import { StockTypes } from '@modules/stock-types/models';
import { PurchaseInvoice, InvoiceDetail, SearchItem } from '../../models';
import { FormMessage } from "@modules/utility/models";
import { InvoiceType } from '@modules/invoice-types/models';

//SERVICES
import { ItemService } from "@modules/items/services";
import { NotificationService, LanguageService, UtilityService } from '@modules/utility/services';
import { AuthService } from "@modules/auth/services";

//UTILS
import { InvoiceUtils } from "../../utils/invoiceUtils";
import { FormUtils, CustomValidator } from "@modules/utility/utils";

@Component({
  selector: 'sb-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  public INVOICE_TYPE_PURCHASE = InvoiceType.getForPurchase();

  public searchItemOptions = new SearchItemOptions();
  public searchItem = new SearchItem();
  public purchaseInvoice = new PurchaseInvoice();

  public items: Array<SearchItem> = [];
  public invoiceDetails: Array<InvoiceDetail> = [];

  
  addItemForm: FormGroup = this.formBuilder.group({
    searchItem: ['', [Validators.required]],
    unit: [''],
    price: [0, [Validators.required, CustomValidator.validateDecimalNumbers, Validators.maxLength(8)]],
    quantity: [0, [Validators.required, CustomValidator.validateDecimalNumbers, Validators.maxLength(5)]]
  });

  public errorsListForm: Array<FormMessage> = [];

  constructor(

    private itemService: ItemService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    public invoiceUtils: InvoiceUtils,
    public authService: AuthService,
    private languageService: LanguageService,
    private utilityService: UtilityService,
    public  formUtils: FormUtils,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    this.invoiceUtils.setHasInvoice(false);
    this.invoiceUtils.checkIsOrder();
    //reset values
    this.invoiceUtils.invoice = new PurchaseInvoice();
    this.invoiceUtils.invoiceDetails = [];

    this.invoiceUtils.setInvoiceID(Number(this.activatedRoute.snapshot.paramMap.get('invoice_id')) ?? 0);
    if (this.invoiceUtils.getInvoiceID() > 0) {

      this.invoiceUtils.getInvoice(this.invoiceUtils.getInvoiceID());
      this.invoiceUtils.getInvoiceDetails(this.invoiceUtils.getInvoiceID());

      this.invoiceUtils.getOrder(Number(this.activatedRoute.snapshot.paramMap.get('order_id')) ?? 0);
    }

  }

  formatter = (item: SearchItem) => item.name;

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
    this.searchItemOptions.stock_type_id = StockTypes.getTypeForPurchase();
    
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

  assignSearchItemToForm(){

    this.addItemForm.controls['unit'].setValue(this.addItemForm.value.searchItem.unit);
    if(this.addItemForm.value.searchItem.type_id == Item.getTypeService()){
      this.addItemForm.controls['unit'].setValue('-');
    }

  }

  getFormValues() {

    let searchItem = new SearchItem();

    searchItem = FormUtils.moveFormValuesToModel(this.addItemForm.value.searchItem, searchItem);

    //Other values
    searchItem.price = Number(this.addItemForm.value.price);
    searchItem.quantity = Number(this.addItemForm.value.quantity);

    return searchItem;
  }

  async addItem() {

    if (this.addItemForm.invalid) {
      this.errorsListForm = this.utilityService.getFormError(this.addItemForm);
      if(this.errorsListForm.length > 0){
        this.errorsListForm[0].setKey(this.languageService.getI18n('invoice.field.' + this.errorsListForm[0].getKey()));
        this.notificationService.error(this.errorsListForm[0].getMessage());
      }
      return;
    }

    this.searchItem = this.getFormValues();

    // check if item is not stocked
    if(!this.searchItem.stocked){
      this.notificationService.error(this.languageService.getI18n('invoice.message.nostocked'));
      return;
    } 

    //Check if the item UNIT allows DECIMAL number
    if(!this.invoiceUtils.unitAllowDecimal(this.searchItem)) return;

    await this.invoiceUtils.create(StockTypes.getTypeForPurchase(), this.searchItem);

    this.searchItem = new SearchItem();
    this.addItemForm.reset();

  }

}
