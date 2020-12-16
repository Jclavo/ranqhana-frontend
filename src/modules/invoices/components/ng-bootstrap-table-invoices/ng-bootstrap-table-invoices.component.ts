import { Component, OnInit, ViewChildren, QueryList, KeyValueDiffer, KeyValueDiffers, HostListener } from '@angular/core';
import { SBSortableHeaderDirective, SortEvent } from '@modules/utility/directives';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

//MODELS
import { SellInvoice, SearchInvoice } from "../../models";
import { InvoiceType } from '@modules/invoice-types/models';
import { Payment } from '@modules/payments/models';
import { PaymentType } from '@modules/payment-types/models';
import { InvoiceStage } from '@modules/invoice-stages/models';

// COMPONENT 
import { ConfirmModalComponent } from "@modules/utility/components/confirm-modal/confirm-modal.component";
import { ShowInvoiceComponent } from "../show-invoice/show-invoice.component";
import { MadePaymentModalComponent } from "@modules/payments/components/made-payment-modal/made-payment-modal.component";


//SERVICES
import { InvoiceService } from "../../services";
import { AuthService } from "@modules/auth/services";
import { NotificationService, UtilityService, CustomDateService, LanguageService } from '@modules/utility/services';
import { InvoiceTypeService } from "@modules/invoice-types/services";
import { InvoiceStageService } from "@modules/invoice-stages/services";

//Utils
import { FormUtils } from "@modules/utility/utils";


@Component({
  selector: 'sb-ng-bootstrap-table-invoices',
  templateUrl: './ng-bootstrap-table-invoices.component.html',
  styleUrls: ['./ng-bootstrap-table-invoices.component.scss']
})
export class NgBootstrapTableInvoicesComponent implements OnInit {

  public searchOption = new SearchInvoice();
  public invoices: Array<SellInvoice> = [];
  public invoiceTypes: Array<InvoiceType> = [];
  public invoiceStages: Array<InvoiceStage> = [];
  public invoiceTotalSum: number = 0;
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
    private invoiceService: InvoiceService,
    private authService: AuthService,
    private ngbModal: NgbModal,
    private utilityService: UtilityService,
    private customDateService: CustomDateService,
    public formUtils: FormUtils,
    private invoiceTypeService: InvoiceTypeService,
    private languageService: LanguageService,
    private router: Router,
    private invoiceStageService: InvoiceStageService
  ) {

    this.searchOptionDiffers = this.differs.find(this.searchOption).create();

    this.searchOption.fromDate = this.searchOption.toDate = this.customDateService.getToday();
  }

  ngOnInit(): void {

    this.maxSizePagination = this.utilityService.getMaxSizePagination(window.screen.width);

    let type_id = this.activatedRoute.snapshot.paramMap.get('type_id');
    if (type_id) {
      this.searchOption.type_id = Number(type_id);
    }

    this.getInvoices();
    this.getInvoiceTypes();
    this.getInvoiceStages();
    
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.maxSizePagination = this.utilityService.getMaxSizePagination(event.target.innerWidth);
  }

  ngDoCheck(): void {
    const changes = this.searchOptionDiffers.diff(this.searchOption);
    if (changes) {
      this.getInvoices();
    }
  }

  onSort({ column, direction }: SortEvent) {
    this.sortedColumn = column;
    this.sortedDirection = direction;

    this.searchOption.sortColumn = this.sortedColumn;
    this.searchOption.sortDirection = this.sortedDirection;
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

  getInvoices() {

    this.invoiceService.get(this.searchOption).subscribe(response => {

      if (response.status) {
        this.invoices = response.result?.values;
        this.invoiceTotalSum =  response.result?.sum;
        this.searchOption.total = response.records;
      } else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });

  }

  getInvoiceStages() {

    this.invoiceStageService.getAll().subscribe(response => {

      if (response.status) {
        this.invoiceStages = response.result;
      } else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });

  }

  modalAnull(id: string, serie: string) {

    const modalRef = this.ngbModal.open(ConfirmModalComponent, { centered: true, backdrop: 'static' });

    modalRef.componentInstance.title = this.languageService.getI18n('invoice.field.name');;
    modalRef.componentInstance.action = this.languageService.getI18n('button.annul');
    modalRef.componentInstance.value = serie;

    modalRef.result.then((result) => {
      result ? this.anull(id) : null;
    });

  }

  anull(id: string) {

    this.invoiceService.anull(id).subscribe(response => {

      if (response.status) {
        this.notificationService.success(response.message);
        this.getInvoices();
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  modalShow(id: string) {

    const modalRef = this.ngbModal.open(ShowInvoiceComponent, { centered: true, backdrop: 'static' });
    modalRef.componentInstance.invoice_id = id;

  }

  madePayment(invoice_id: number, payment_type_id: number, payments: Array<Payment>, ) {

    let paymentRecords = payments.length;
    // if(paymentRecords == 0){
    //   this.notificationService.error('There are not payments for this invoice.');
    // }else

    //if there is a internal credit
    if(payment_type_id == PaymentType.getForInternalCredit()){
      this.router.navigate(['/payments', invoice_id]);
    }

    if (paymentRecords == 1) {
      this.openModalMadePayment(payments[0].id);
    } else {
      this.router.navigate(['/payments', invoice_id]);
    }
  }

  openModalMadePayment(payment_id: Number) {
    const modalRef = this.ngbModal.open(MadePaymentModalComponent, { centered: true, backdrop: 'static' });

    modalRef.componentInstance.payment_id = payment_id;

    modalRef.result.then((result: Response) => {

      if (result.status) {
        this.getInvoices();
      }

    });
  }

}
