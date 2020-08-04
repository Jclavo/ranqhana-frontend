import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//MODELS
import { Item } from "@modules/items/models";
import { Unit } from "@modules/units/models";
import { StockTypes } from "@modules/stock-types/models";

//SERVICES
import { ItemService } from "../../services";
import { NotificationService } from '@modules/utility/services';
import { AuthService } from '@modules/auth/services';
import { UnitService } from '@modules/units/services';
import { StockTypesService } from '@modules/stock-types/services';

@Component({
  selector: 'sb-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  public item = new Item();

  public units: Array<Unit> = [];
  public stockTypes: Array<StockTypes> = [];

  constructor(
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private authService: AuthService,
    private unitService: UnitService,
    private stockTypesService: StockTypesService
  ) { }

  ngOnInit(): void {

    this.getUnits();
    this.getStockTypes();

    this.item.id = this.activatedRoute.snapshot.paramMap.get('id') ? Number(this.activatedRoute.snapshot.paramMap.get('id')) : 0;
    this.item.id ? this.getById(this.item.id) : null;
  }
  
  getById(id: number)
  {
    this.itemService.getById(id).subscribe(response => {

      if (response.status) {
        this.item = response.result;

        //logic to check as true the stock types selected
        for (let i = 0; i < this.item.stock_types.length; i++) {
            for (let j = 0; j < this.stockTypes.length; j++) {
              if(this.item.stock_types[i] == this.stockTypes[j].id){
                this.stockTypes[j].checked = true;
                break;
              }
            }
        }
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  save() {

    this.item.stock_types = this.getStockTypesChoosen(); // get stock types selected

    if(this.item.stock_types.length == 0){
      this.notificationService.error('Select at least one stock type.');
      return;
    }

    if(this.item.id){
      this.update(this.item);
    }
    else{
      this.item.store_id = this.authService.getUserStoreID();
      this.create(this.item);
    }

  }

  create(item: Item) {
    this.itemService.create(item).subscribe(response => {

      if (response.status) {
        this.notificationService.success(response.message);
        this.router.navigate(['/items']);
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  update(item: Item)
  {
    this.itemService.update(item).subscribe(response => {

      if (response.status) {
        this.notificationService.success(response.message);
        this.router.navigate(['/items']);
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  getUnits(){

    this.unitService.get().subscribe(response => {

      if (response.status) {
        this.units = response.result;
      }else{
        this.notificationService.error(response.message);
      }
    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  getStockTypes(){

    this.stockTypesService.get().subscribe(response => {

      if (response.status) {
        this.stockTypes = response.result;
      }else{
        this.notificationService.error(response.message);
      }
    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  getStockTypesChoosen(){

    let stockTypes: Array<StockTypes> = [];
    stockTypes = this.stockTypes.filter(function(value) {
      return value.checked == true;
    });

    return stockTypes.map(function(value) {
      return value.id;
    });

  }

}
