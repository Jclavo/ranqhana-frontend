import { Component, OnInit, ViewChildren, QueryList, KeyValueDiffer, KeyValueDiffers, HostListener } from '@angular/core';
import { SBSortableHeaderDirective, SortEvent } from '@modules/utility/directives';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

// COMPONENT 
import { ConfirmModalComponent } from "@modules/utility/components/confirm-modal/confirm-modal.component";
import { ChangeStageModalComponent } from "@modules/utility/components/change-stage-modal/change-stage-modal.component";
import { ChangeDateModalComponent } from "@modules/utility/components/change-date-modal/change-date-modal.component";

//SERVICES
import { OrderService } from "../../services";
import { AuthService } from "@modules/auth/services";
import { NotificationService, UtilityService, CustomDateService } from '@modules/utility/services';
import { InvoiceService } from "@modules/invoices/services";
import { InvoiceTypeService } from "@modules/invoice-types/services";
import { OrderStageService } from "@modules/order-stages/services";

//MODELS
import { Order, SearchOrder } from "../../models";
import { Response } from '@modules/utility/models';
import { InvoiceType } from '@modules/invoice-types/models';
import { OrderStage } from '@modules/order-stages/models';

//Utils
import { FormUtils } from "@modules/utility/utils";


@Component({
  selector: 'sb-ng-bootstrap-table-orders',
  templateUrl: './ng-bootstrap-table-orders.component.html',
  styleUrls: ['./ng-bootstrap-table-orders.component.scss']
})
export class NgBootstrapTableOrdersComponent implements OnInit {

  public INVOICE_TYPE_SELL = InvoiceType.getForSell();
  public INVOICE_TYPE_PURCHASE = InvoiceType.getForPurchase();

  public searchOption = new SearchOrder();
  public orders: Array<Order> = [];
  public invoiceTypes: Array<InvoiceType> = [];
  public orderStages: Array<OrderStage> = [];
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
    public formUtils: FormUtils,
    private invoiceService: InvoiceService,
    private invoiceTypeService: InvoiceTypeService,
    private orderStageService: OrderStageService
  ) {

    this.searchOptionDiffers = this.differs.find(this.searchOption).create();

    this.searchOption.fromDate = this.searchOption.toDate = this.customDateService.getToday();
  }

  ngOnInit(): void {

    let type_id = this.activatedRoute.snapshot.paramMap.get('type_id');
    if (type_id) {
      this.searchOption.type_id = Number(type_id);
    }

    this.getOrders();
    this.getInvoiceTypes();
    this.getOrderStages();
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

  getInvoiceTypes() {

    this.invoiceTypeService.getAll().subscribe(response => {

      if (response.status) {
        this.invoiceTypes = response.result;
      } else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });

  }

  getOrderStages() {

    this.orderStageService.getAll().subscribe(response => {

      if (response.status) {
        this.orderStages = response.result;
      } else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });

  }

  modalAnull(id: string) {

    const modalRef = this.ngbModal.open(ConfirmModalComponent, { centered: true, backdrop: 'static' });

    modalRef.componentInstance.title = 'Order';
    modalRef.componentInstance.action = 'Anull/Cancel';
    modalRef.componentInstance.value = id;

    modalRef.result.then((result) => {
      result ? this.anull(id) : null;
    });

  }

  anull(id: string) {

    this.invoiceService.anull(id).subscribe(response => {

      if (response.status) {
        this.notificationService.success(response.message);
        this.getOrders();
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  modalUpdateStage(order_id: number, stage_id: number) {
    const modalRef = this.ngbModal.open(ChangeStageModalComponent, { centered: true, backdrop: 'static' });

    modalRef.componentInstance.model = Order.getModelName();
    modalRef.componentInstance.model_id = order_id;
    modalRef.componentInstance.stage_id = stage_id;

    modalRef.result.then((result: Response) => {
      result.status ? this.getOrders() : null;
    });
  }

  modalUpdateDate(order_id: number, date: string) {
    const modalRef = this.ngbModal.open(ChangeDateModalComponent, { centered: true, backdrop: 'static' });

    modalRef.componentInstance.model = Order.getModelName();
    modalRef.componentInstance.model_id = order_id;
    modalRef.componentInstance.date = this.customDateService.formatDDMMYYYYtoYYYYMMDD(date);

    modalRef.result.then((result: Response) => {
      result.status ? this.getOrders() : null;
    });
  }
}
