import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

//MODELS
import { Item, SearchOptions } from '@modules/items/models';
import { SellItem, SellInvoice } from '../../models';


//SERVICES
import { ItemService } from "@modules/items/services";
import { AuthService } from "@modules/auth/services";
import { NotificationService } from '@modules/utility/services';
import { ItemsModule } from '@modules/items/items.module';


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
  public sellItems: Array<SellItem> = [];

  public selectQuantity: number = 1;

  constructor(
    private itemService: ItemService,
    private authService: AuthService,
    private notificationService: NotificationService,
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
    if(this.selectQuantity <= 0){
      this.notificationService.error("Select a quantity");
      return;
    }

    if(this.selectQuantity > this.searchItem.quantity){
      this.notificationService.error("There is not stock for this quantity");
      return;
    }

    //Check if the item has already exist in the list
    let indexSellItem = this.sellItems.findIndex(value => value.id == this.searchItem.id);

    if(indexSellItem < 0){
      let sellItem = new SellItem();
      sellItem.id = this.searchItem.id;
      sellItem.name = this.searchItem.name;
      sellItem.quantity =this.selectQuantity;
      sellItem.price = this.searchItem.price;
      sellItem.total = sellItem.quantity * sellItem.price;
      this.sellItems.push(sellItem);
    }
    else{

      this.sellItems[indexSellItem].quantity = this.sellItems[indexSellItem].quantity + this.selectQuantity;
      this.sellItems[indexSellItem].price = this.searchItem.price;
      this.sellItems[indexSellItem].total = this.sellItems[indexSellItem].quantity * this.sellItems[indexSellItem].price;

    }
    // sellItem.total = sellItem.total.toPrecision(2)

    this.selectQuantity = 0;
    this.searchItem = new Item();

    // Calculate final values for SellInvoice
    this.calculateSellInvoice();


  }

  delete(index: number)
  {
    this.sellItems.splice(index, 1);
    // Calculate final values for SellInvoice
    this.calculateSellInvoice();
  }

  calculateSellInvoice() {

    this.sellInvoice.subtotal = 0.0;
    // this.sellInvoice.taxes = 0.0;
    // this.sellInvoice.discount = 0.0;
    this.sellInvoice.total = 0.0;

    // Get subtotal
    for (let index = 0; index < this.sellItems.length; index++) {
      this.sellInvoice.subtotal = this.sellInvoice.subtotal + this.sellItems[index].total
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
    let indexSellItem = this.sellItems.findIndex(value => value.id == this.searchItem.id);

    if(indexSellItem >= 0){
      this.searchItem.quantity =  this.searchItem.quantity  - this.sellItems[indexSellItem].quantity;
    }

  }

}
