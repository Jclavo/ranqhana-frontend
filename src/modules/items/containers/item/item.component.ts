import { Component, OnInit } from '@angular/core';

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
    private itemService: ItemService,

  ) { }

  ngOnInit(): void {
  }

  save() {
    console.log('item', this.item);

    if(this.item.id){
      
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
        // this.router.navigate(['/login']);
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
    });
  }

}
