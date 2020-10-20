import { Component, OnInit, ViewChildren, QueryList, KeyValueDiffer, KeyValueDiffers, HostListener } from '@angular/core';
import { SBSortableHeaderDirective, SortEvent } from '@modules/utility/directives';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
//MODELS
// import { SearchOptions } from '@modules/items/models';
import { Order, SearchOrder } from "../../models";

// COMPONENT 
import { ConfirmModalComponent } from "@modules/utility/components/confirm-modal/confirm-modal.component";

//SERVICES
import { OrderService } from "../../services";
import { AuthService } from "@modules/auth/services";
import { NotificationService, UtilityService, CustomDateService } from '@modules/utility/services';

//Utils
import { FormUtils } from "@modules/utility/utils";

@Component({
  selector: 'sb-ng-bootstrap-table-orders',
  templateUrl: './ng-bootstrap-table-orders.component.html',
  styleUrls: ['./ng-bootstrap-table-orders.component.scss']
})
export class NgBootstrapTableOrdersComponent implements OnInit {

  public searchOption = new SearchOrder();
  public orders: Array<Order> = [];
  public parameters: any;
  public maxSizePagination: number = 10;

  private searchOptionDiffers: KeyValueDiffer<string, any>;

  public sortedColumn!: string;
  public sortedDirection!: string;

  @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

  constructor(
    private differs: KeyValueDiffers, // to get changes in a object
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private orderService: OrderService,
    private authService: AuthService,
    private ngbModal: NgbModal,
    private utilityService: UtilityService,
    private customDateService: CustomDateService,
    public formUtils: FormUtils
  ) {

    this.searchOptionDiffers = this.differs.find(this.searchOption).create();

    this.searchOption.fromDate = this.searchOption.toDate = this.customDateService.getToday();
  }

  ngOnInit(): void {

    // let typeInvoice = this.activatedRoute.snapshot.paramMap.get('typeInvoice');
    // if (typeInvoice) {
    //   this.searchOption.type_id = Number(typeInvoice);
    // }

    this.getOrders();
    this.maxSizePagination = this.utilityService.getMaxSizePagination(window.screen.width);

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.maxSizePagination = this.utilityService.getMaxSizePagination(event.target.innerWidth);
  }

  ngDoCheck(): void {
    const changes = this.searchOptionDiffers.diff(this.searchOption);
    if (changes) {
      this.getOrders();
    }
  }

  onSort({ column, direction }: SortEvent) {
    this.sortedColumn = column;
    this.sortedDirection = direction;

    this.searchOption.sortColumn = this.sortedColumn;
    this.searchOption.sortDirection = this.sortedDirection;
  }


  getOrders() {

    // let parameters = { 'store_id': this.authService.getUserStoreID(), 'searchOption': this.searchOption };

    this.orderService.get(this.searchOption).subscribe(response => {

      if (response.status) {
        this.orders = response.result;
        this.searchOption.total = response.records;
      } else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });

  }
}
