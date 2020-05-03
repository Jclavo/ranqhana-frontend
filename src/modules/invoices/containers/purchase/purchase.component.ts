import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';


import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//MODELS
import { SearchOptions } from '@modules/items/models';
import { PurchaseInvoice, InvoiceDetail, SearchItem, Invoice } from '../../models';



//SERVICES
import { ItemService } from "@modules/items/services";
import { NotificationService, UtilityService, CustomValidatorService } from '@modules/utility/services';
import { AuthService } from "@modules/auth/services";


//UTILS
import { InvoiceUtils } from "../../utils/invoiceUtils";
import { FormUtils } from "@modules/utility/utils";


@Component({
  selector: 'sb-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  public searchOption = new SearchOptions();
  public searchItem = new SearchItem();
  public purchaseInvoice = new PurchaseInvoice();

  public items: Array<SearchItem> = [];
  public invoiceDetails: Array<InvoiceDetail> = [];

  
  addItemForm: FormGroup = this.formBuilder.group({
    searchItem: ['', [Validators.required]],
    unit: [''],
    price: [0, [Validators.required, CustomValidatorService.validatePositiveNumbers]],
    quantity: [0, [Validators.required, CustomValidatorService.validatePositiveNumbers]]
  });

  public errorsListForm: Array<string> = [];

  constructor(

    private itemService: ItemService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private utilityService: UtilityService,
    private invoiceUtils: InvoiceUtils,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // this.openModalAdditionalInfo();
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

    this.searchOption.searchValue = searchValue;

    let parameters = { 'store_id': this.authService.getUserStoreID(), 'searchOption': this.searchOption };

    return this.itemService.get(parameters).pipe(
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

  }

  getFormValues() {

    let searchItem = new SearchItem();

    searchItem = FormUtils.moveFormValuesToModel(this.addItemForm.value.searchItem, searchItem);

    //Other values
    searchItem.price = this.addItemForm.value.price;
    searchItem.quantity = this.addItemForm.value.quantity;

    return searchItem;
  }

  addItem() {

    if (this.addItemForm.invalid) {
      this.errorsListForm = FormUtils.getFormError(this.addItemForm);
      this.notificationService.error(this.errorsListForm[0]);
      return;
    }

    this.searchItem = this.getFormValues();

    // check if item is not stocked
    if(!this.searchItem.stocked){
      this.notificationService.error("Item is not stocked");
      return;
    } 

    //Check if the item UNIT allows DECIMAL number
    if(!this.invoiceUtils.unitAllowDecimal(this.searchItem)) return;
    
    this.invoiceDetails = this.invoiceUtils.addInvoiceDetail(this.searchItem, this.invoiceDetails);

    this.searchItem = new SearchItem();
    this.addItemForm.reset()

    // Calculate final values for purchaseInvoice
    this.calculateInvoice();


  }

  delete(index: number) {
    
    this.invoiceDetails = this.invoiceUtils.delete(index, this.invoiceDetails);
    this.calculateInvoice();
  }

  calculateInvoice() {

    this.purchaseInvoice = this.invoiceUtils.calculateInvoice(this.purchaseInvoice, this.invoiceDetails);

    // this.invoiceForm = this.moveModelValuesToForm(this.invoiceForm, this.purchaseInvoice);

  }

  calculateDiscount() {

    this.purchaseInvoice = this.invoiceUtils.calculateDiscount(this.purchaseInvoice);

  }

  save() {

    this.purchaseInvoice.setTypeForPurchase();
    this.invoiceUtils.create(this.purchaseInvoice, this.invoiceDetails);

  }

}
