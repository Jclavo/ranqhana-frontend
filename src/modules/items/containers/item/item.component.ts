import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//MODELS
import { Item } from "@modules/items/models";
import { Unit } from "@modules/units/models";

//SERVICES
import { ItemService } from "../../services";
import { NotificationService } from '@modules/utility/services';
import { AuthService } from '@modules/auth/services';
import { UnitService } from '@modules/units/services';

@Component({
  selector: 'sb-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  public item = new Item();

  public units: Array<Unit> = [];

  constructor(
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private authService: AuthService,
    private unitService: UnitService,

  ) { }

  ngOnInit(): void {

    this.getUnits();

    this.item.id = this.activatedRoute.snapshot.paramMap.get('id') ? Number(this.activatedRoute.snapshot.paramMap.get('id')) : 0;
    this.item.id ? this.getById(this.item.id) : null;
  }
  
  getById(id: number)
  {
    this.itemService.getById(id).subscribe(response => {

      if (response.status) {
        //this.notificationService.success(response.message);
        // this.item.name = response.result?.name;
        // this.item.description = response.result?.description;
        // this.item.price = response.result?.price;
        // this.item.store_id = response.result?.store_id;
        this.item = response.result;

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

}
