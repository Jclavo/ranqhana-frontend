import { Component, OnInit, Input, ViewChildren, QueryList, ChangeDetectionStrategy, ChangeDetectorRef, KeyValueDiffer, KeyValueDiffers } from '@angular/core';
import { Observable } from 'rxjs';

import { SBSortableHeaderDirective, SortEvent } from '@modules/items/directives';
import { ItemService } from '@modules/items/services';

//MODELS
import { Item, SearchOptions } from '@modules/items/models';


@Component({
  selector: 'sb-ng-bootstrap-table-items',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ng-bootstrap-table-items.component.html',
  styleUrls: ['./ng-bootstrap-table-items.component.scss']
})
export class NgBootstrapTableItemsComponent implements OnInit {

  public searchOption = new SearchOptions();
  public items: Array<Item> = [];
  public parameters: any;

  private searchOptionDiffers: KeyValueDiffer<string, any>;

  public sortedColumn!: string;
  public sortedDirection!: string;

  // @Input() pageSize = 2;

  // items$!: Observable<Item[]>;
  // total$!: Observable<number>;
  

  @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

  constructor(
    private itemService: ItemService,
    private changeDetectorRef: ChangeDetectorRef,
    private differs: KeyValueDiffers
  ) { 

    // this.customer = new Customer();
    this.searchOptionDiffers = this.differs.find(this.searchOption).create();
  }

  ngOnInit(): void {

    // console.log('this.items$',this.items$);
    // this.itemService.pageSize = this.pageSize;
    // this.items$ = this.itemService.items$;
    // this.total$ = this.itemService.total$;

    // this.searchOption.pageSize = this.pageSize;

    // this.searchOption.pageSize = this.pageSize;
    console.log('this.searchOption', this.searchOption);

    this.getItems();

  }

  ngDoCheck(): void {
    const changes = this.searchOptionDiffers.diff(this.searchOption);
    if (changes) {
      console.log('changed');
      this.getItems();
    }
  }

  onSort({ column, direction }: SortEvent) {
    this.sortedColumn = column;
    this.sortedDirection = direction;

    this.searchOption.sortColumn = this.sortedColumn;
    this.searchOption.sortDirection = this.sortedDirection;
    // this.itemService.sortColumn = column;
    // this.itemService.sortDirection = direction;
    // this.changeDetectorRef.detectChanges();
    // console.log('this.searchOption', this.searchOption);
  }


  getItems() {
    let parameters = { 'store_id' : 1, 'searchOption': this.searchOption};

    this.itemService.getAll(parameters).subscribe(response => {

      console.log(response.message);
      if (response.status) {

        this.items = response.result;

        this.searchOption.total = response.records;

        console.log('this.searchOption', this.searchOption);

        // this.changeDetectorRef.detectChanges();


      }

    }, error => {
      console.log(error);
      //loading.dismiss();
    });

  }





}
