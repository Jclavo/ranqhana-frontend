import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

//MODELS
import { Item, SearchOptions } from '@modules/items/models';


//SERVICES
import { ItemService } from "@modules/items/services";
import { AuthService } from "@modules/auth/services";
import { NotificationService } from '@modules/utility/services';
import { ItemsModule } from '@modules/items/items.module';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

@Component({
  selector: 'sb-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {

  public searchValue: string = "";

  public searchOption = new SearchOptions();
  public searchItem = new Item();
  public items: Array<Item> = [];

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

  // addItem()
  // {
    
  // }

}
