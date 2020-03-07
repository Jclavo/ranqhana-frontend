import { Component, OnInit, Input, ViewChildren, QueryList, ChangeDetectionStrategy, ChangeDetectorRef, KeyValueDiffer, KeyValueDiffers } from '@angular/core';
import { Observable } from 'rxjs';
import { SBSortableHeaderDirective, SortEvent } from '@modules/items/directives';

//MODELS
import { Item, SearchOptions } from '@modules/items/models';

//SERVICES
import { ItemService } from "@modules/items/services";
import { NotificationService } from '../../../utility/services';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmModalComponent } from "../confirm-modal/confirm-modal.component";

@Component({
  selector: 'sb-ng-bootstrap-table-items',
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

  @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

  constructor(
    private differs: KeyValueDiffers, // to get changes in a object
    private notificationService: NotificationService,
    private itemService: ItemService,
    private modalService: NgbModal,
  ) {

    this.searchOptionDiffers = this.differs.find(this.searchOption).create();
  }

  ngOnInit(): void {

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
  }


  getItems() {

    let parameters = { 'store_id': 1, 'searchOption': this.searchOption };

    this.itemService.get(parameters).subscribe(response => {

      if (response.status) {
        this.items = response.result;
        this.searchOption.total = response.records;
      }

    }, error => {
      this.notificationService.error(error);
    });

  }

  modalDelete(id: string, name: string) {
    console.log('delete: ', id);
    
    const modalRef = this.modalService.open(ConfirmModalComponent, { centered: true, backdrop: 'static' });

    modalRef.componentInstance.title = 'Item';
    modalRef.componentInstance.value = name;

    modalRef.result.then((result) => {
      result ? this.delete(id) : null;
    });

  }

  delete(id: string) {

    this.itemService.delete(id).subscribe(response => {

      if (response.status) {
        this.notificationService.success(response.message);
        this.getItems();
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
    });
  }





}