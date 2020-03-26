import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

//MODELS
import { Item, SearchOptions } from '@modules/items/models';
import { SellInvoice, InvoiceDetail } from '../../models';


//SERVICES
import { ItemService } from "@modules/items/services";
import { AuthService } from "@modules/auth/services";
import { NotificationService } from '@modules/utility/services';
// import { ItemsModule } from '@modules/items/items.module';
import { InvoiceService } from '../../services';


@Component({
  selector: 'sb-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {

  public searchOption = new SearchOptions();
  public searchItem = new Item();
  public sellInvoice = new SellInvoice();

  public items: Array<Item> = [];
  public invoiceDetails: Array<InvoiceDetail> = [];

  public quantity: number = 1;

  constructor(
    private itemService: ItemService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private invoiceService: InvoiceService,
  ) { }

  ngOnInit(): void {
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

    this.searchOption.searchValue = searchValue;

    let parameters = { 'store_id': this.authService.getUserStoreID(), 'searchOption': this.searchOption };

    return this.itemService.get(parameters).pipe(
      map(response => {

        if (response.status) {
          // let itemSearch = [];
          this.items = response.result;
          // for (let index = 0; index < this.items.length; index++) {
          //   // itemSearch.push( '[' + this.items[index]?.id + '] '+ this.items[index]?.name);
          //   itemSearch.push(this.items[index]?.name);
          // }
          // return itemSearch;
          return this.items;
        } else {
          return []
        }
      })
    );
  }

  addItem() {
    //validate item selected
    if(!this.searchItem.id){
      this.notificationService.error("Select an item");
      return;
    } 

    //validate quantity
    if(this.quantity <= 0){
      this.notificationService.error("Select a quantity");
      return;
    }

    if(this.quantity > this.searchItem.stock){
      this.notificationService.error("There is not stock for this quantity");
      return;
    }

    //Check if the item has already exist in the list
    let indexSellItem = this.invoiceDetails.findIndex(value => value.item_id == this.searchItem.id);

    if(indexSellItem < 0){
      let invoiceDetail     = new InvoiceDetail();
      invoiceDetail.item_id = this.searchItem.id;
      invoiceDetail.name    = this.searchItem.name;
      invoiceDetail.quantity =this.quantity;
      invoiceDetail.price   = this.searchItem.price;
      invoiceDetail.total   = invoiceDetail.quantity * invoiceDetail.price;
      this.invoiceDetails.push(invoiceDetail);
    }
    else{

      this.invoiceDetails[indexSellItem].quantity = this.invoiceDetails[indexSellItem].quantity + this.quantity;
      this.invoiceDetails[indexSellItem].price = this.searchItem.price;
      this.invoiceDetails[indexSellItem].total = this.invoiceDetails[indexSellItem].quantity * this.invoiceDetails[indexSellItem].price;

    }
    // invoiceDetail.total = invoiceDetail.total.toPrecision(2)

    this.quantity = 0;
    this.searchItem = new Item();

    // Calculate final values for SellInvoice
    this.calculateSellInvoice();


  }

  delete(index: number)
  {
    this.invoiceDetails.splice(index, 1);
    // Calculate final values for SellInvoice
    this.calculateSellInvoice();
  }

  calculateSellInvoice() {

    this.sellInvoice.subtotal = 0.0;
    // this.sellInvoice.taxes = 0.0;
    // this.sellInvoice.discount = 0.0;
    this.sellInvoice.total = 0.0;

    // Get subtotal
    for (let index = 0; index < this.invoiceDetails.length; index++) {
      this.sellInvoice.subtotal = this.sellInvoice.subtotal + this.invoiceDetails[index].total
    }

    //Get total
    this.sellInvoice.total = this.sellInvoice.subtotal + this.sellInvoice.taxes - this.sellInvoice.discount;

  }

  calculateDiscount(){

    if(this.sellInvoice.discount < 0){
      this.notificationService.error("The discount is a negative number");
      this.sellInvoice.discount = 0.0;
      return;
    }

    if(this.sellInvoice.discount > this.sellInvoice.subtotal){
      this.notificationService.error("The discount is great than the subtotal");
      this.sellInvoice.discount = 0.0;
      return;
    }

      this.sellInvoice.total = this.sellInvoice.subtotal + this.sellInvoice.taxes - this.sellInvoice.discount;
    
  }

  calculateStock(){
    
    //Check if the item has already exist in the list
    let indexSellItem = this.invoiceDetails.findIndex(value => value.item_id == this.searchItem.id);

    if(indexSellItem >= 0){
      this.searchItem.stock =  this.searchItem.stock  - this.invoiceDetails[indexSellItem].quantity;
    }

  }

  save() {

    if(this.sellInvoice.id){
      // this.update(this.item);
    }
    else{
      this.create(this.sellInvoice);
    }

  }

  create(sellInvoice: SellInvoice) {
    this.invoiceService.createSellInvoice(sellInvoice).subscribe(response => {

      if (response.status) {
        this.notificationService.success(response.message);

        // Add Details
        for (let index = 0; index < this.invoiceDetails.length; index++) {
          this.invoiceDetails[index].invoice_id = response.result.id;
          this.addDetail(this.invoiceDetails[index]);
        }
        // this.router.navigate(['/items']);
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }


  addDetail(invoiceDetail: InvoiceDetail) {
    this.invoiceService.addInvoiceDetail(invoiceDetail).subscribe(response => {

      if (response.status) {
        // this.notificationService.success(response.message);
        console.log(response.message);
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

}