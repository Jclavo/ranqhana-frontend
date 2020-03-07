import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//MODELS
import { Item } from "@modules/items/models";

//SERVICES
import { ItemService } from "@modules/items/services";
import { NotificationService } from '../../../utility/services';

@Component({
  selector: 'sb-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  public item = new Item();

  constructor(
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,

  ) { }

  ngOnInit(): void {
    this.item.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.item.id ? this.getById(this.item.id) : null;
  }
  
  getById(id: string)
  {
    this.itemService.getById(id).subscribe(response => {

      if (response.status) {
        //this.notificationService.success(response.message);
        this.item.name = response.result?.name;
        this.item.description = response.result?.description;
        this.item.store_id = response.result?.store_id;

      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
    });
  }

  save() {

    if(this.item.id){
      this.update(this.item);
    }
    else{
      this.item.store_id = 1;
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
    });
  }

}
