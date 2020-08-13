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
  selector: 'sb-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  public service = new Item();

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

    this.service.id = this.activatedRoute.snapshot.paramMap.get('id') ? Number(this.activatedRoute.snapshot.paramMap.get('id')) : 0;
    this.service.id ? this.getById(this.service.id) : null;
  }
  
  getById(id: number)
  {
    this.itemService.getById(id).subscribe(response => {

      if (response.status) {
        this.service = response.result;

        //logic to check as true the stock types selected
        for (let i = 0; i < this.service.stock_types.length; i++) {
            for (let j = 0; j < this.stockTypes.length; j++) {
              if(this.service.stock_types[i] == this.stockTypes[j].id){
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

    this.service.stock_types = this.getStockTypesChoosen(); // get stock types selected

    if(this.service.stock_types.length == 0){
      this.notificationService.error('Select at least one stock type.');
      return;
    }

    if(this.service.id){
      this.update(this.service);
    }
    else{
      this.service.store_id = this.authService.getUserStoreID();
      this.create(this.service);
    }

  }

  create(service: Item) {
    this.itemService.createService(service).subscribe(response => {

      if (response.status) {
        this.notificationService.success(response.message);
        this.router.navigate(['/items/services']);
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  update(service: Item)
  {
    this.itemService.updateService(service).subscribe(response => {

      if (response.status) {
        this.notificationService.success(response.message);
        this.router.navigate(['/items/services']);
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
