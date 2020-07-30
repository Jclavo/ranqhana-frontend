import { Component, OnInit, ViewChildren, QueryList, KeyValueDiffer, KeyValueDiffers, HostListener } from '@angular/core';
import { SBSortableHeaderDirective, SortEvent } from '@modules/utility/directives';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

//MODELS
import { Item, SearchItemOptions } from '@modules/items/models';

// COMPONENT 
import { ConfirmModalComponent } from '@modules/utility/components';

//SERVICES
import { ItemService } from "../../services";
import { AuthService } from "@modules/auth/services";
import { NotificationService, UtilityService } from '@modules/utility/services';

@Component({
  selector: 'sb-ng-bootstrap-table-items',
  templateUrl: './ng-bootstrap-table-items.component.html',
  styleUrls: ['./ng-bootstrap-table-items.component.scss']
})
export class NgBootstrapTableItemsComponent implements OnInit {

  public searchOption = new SearchItemOptions();
  public items: Array<Item> = [];
  public parameters: any;
  public maxSizePagination: number = 10;

  private searchOptionDiffers: KeyValueDiffer<string, any>;

  public sortedColumn!: string;
  public sortedDirection!: string;

  @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

  constructor(
    private differs: KeyValueDiffers, // to get changes in a object
    private notificationService: NotificationService,
    private itemService: ItemService,
    private modalService: NgbModal,
    private authService: AuthService,
    private utilityService: UtilityService
  ) {

    this.searchOptionDiffers = this.differs.find(this.searchOption).create();
  }

  ngOnInit(): void {

    this.getItems();
    this.maxSizePagination = this.utilityService.getMaxSizePagination(window.screen.width);

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any ) {
    this.maxSizePagination = this.utilityService.getMaxSizePagination(event.target.innerWidth);
  }

  ngDoCheck(): void {
    const changes = this.searchOptionDiffers.diff(this.searchOption);
    if (changes) {
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

    this.itemService.get(this.searchOption).subscribe(response => {

      if (response.status) {
        this.items = response.result;
        console.log(this.items);
        this.searchOption.total = response.records;
      }else{
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });

  }

  modalDelete(id: string, name: string) {
    
    const modalRef = this.modalService.open(ConfirmModalComponent, { centered: true, backdrop: 'static' });

    modalRef.componentInstance.title = 'Item';
    modalRef.componentInstance.action = 'delete';
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
      this.authService.raiseError();
    });
  }

  


}
