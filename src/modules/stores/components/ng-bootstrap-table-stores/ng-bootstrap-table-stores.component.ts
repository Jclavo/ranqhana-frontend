import { Component, OnInit, ViewChildren, QueryList, KeyValueDiffer, KeyValueDiffers, HostListener } from '@angular/core';
import { SBSortableHeaderDirective, SortEvent } from '@modules/utility/directives';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

//MODELS
import { SearchOptions } from '@modules/utility/models';
import { Store } from "../../models";

// COMPONENT 
import { ConfirmModalComponent } from '@modules/utility/components';
import { StoreModalComponent } from '../store-modal/store-modal.component';

//SERVICES
import { StoreService } from "../../services";
import { AuthService } from "@modules/auth/services";
import { NotificationService, UtilityService } from '@modules/utility/services';

@Component({
  selector: 'sb-ng-bootstrap-table-stores',
  templateUrl: './ng-bootstrap-table-stores.component.html',
  styleUrls: ['./ng-bootstrap-table-stores.component.scss']
})
export class NgBootstrapTableStoresComponent implements OnInit {

  public searchOption = new SearchOptions();
  public stores: Array<Store> = [];
  public parameters: any;
  public maxSizePagination: number = 10;

  private searchOptionDiffers: KeyValueDiffer<string, any>;

  public sortedColumn!: string;
  public sortedDirection!: string;

  @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

  constructor(
    private differs: KeyValueDiffers, // to get changes in a object
    private notificationService: NotificationService,
    private storeService: StoreService,
    private modalService: NgbModal,
    private authService: AuthService,
    private utilityService: UtilityService
  ) {

    this.searchOptionDiffers = this.differs.find(this.searchOption).create();
  }

  ngOnInit(): void {

    this.getStores();
    this.maxSizePagination = this.utilityService.getMaxSizePagination(window.screen.width);

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any ) {
    this.maxSizePagination = this.utilityService.getMaxSizePagination(event.target.innerWidth);
  }

  ngDoCheck(): void {
    const changes = this.searchOptionDiffers.diff(this.searchOption);
    if (changes) {
      this.getStores();
    }
  }

  onSort({ column, direction }: SortEvent) {
    this.sortedColumn = column;
    this.sortedDirection = direction;

    this.searchOption.sortColumn = this.sortedColumn;
    this.searchOption.sortDirection = this.sortedDirection;
  }


  getStores() {

    let parameters = this.searchOption;

    this.storeService.get(parameters).subscribe(response => {

      if (response.status) {
        this.stores = response.result;
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

    modalRef.componentInstance.title = 'Unit';
    modalRef.componentInstance.action = 'delete';
    modalRef.componentInstance.value = name;

    modalRef.result.then((result) => {
      result ? this.delete(id) : null;
    });

  }

  delete(id: string) {

    this.storeService.delete(id).subscribe(response => {

      if (response.status) {
        this.notificationService.success(response.message);
        this.getStores();
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }


  openStoreModal(id: string = '') {
    const modalRef = this.modalService.open(StoreModalComponent, { centered: true, backdrop: 'static' });

    modalRef.componentInstance.store_id = id;
    // modalRef.componentInstance.value = name;

    modalRef.result.then((result) => {
      result ? this.getStores() : null;
    });
  }

}
