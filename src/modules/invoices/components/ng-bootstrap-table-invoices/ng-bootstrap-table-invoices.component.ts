import { Component, OnInit, ViewChildren, QueryList, KeyValueDiffer, KeyValueDiffers, HostListener } from '@angular/core';
import { SBSortableHeaderDirective, SortEvent } from '@modules/utility/directives';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

//MODELS
import { InvoiceType } from '@modules/invoice-types/models';
import { SellInvoice, SearchInvoice } from "../../models";

// COMPONENT 
import { ConfirmModalComponent } from "@modules/utility/components/confirm-modal/confirm-modal.component";
import { ShowInvoiceComponent } from "../show-invoice/show-invoice.component";

//SERVICES
import { InvoiceService } from "../../services";
import { AuthService } from "@modules/auth/services";
import { NotificationService, UtilityService, CustomDateService, LanguageService } from '@modules/utility/services';
import { InvoiceTypeService } from "@modules/invoice-types/services";

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
  ) {

    this.searchOptionDiffers = this.differs.find(this.searchOption).create();

    this.searchOption.fromDate = this.searchOption.toDate = this.customDateService.getToday();
  }
  
  ngOnInit(): void {

    let type_id = this.activatedRoute.snapshot.paramMap.get('type_id');
    if(type_id){
      this.searchOption.type_id = Number(type_id);
    }

    this.getInvoices();
    this.getInvoiceTypes();
    this.maxSizePagination = this.utilityService.getMaxSizePagination(window.screen.width);

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any ) {
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
        this.invoices = response.result;
        this.searchOption.total = response.records;
      }else{
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

}
