import { Component, OnInit, ViewChildren, QueryList, KeyValueDiffer, KeyValueDiffers } from '@angular/core';
import { SBSortableHeaderDirective, SortEvent } from '@modules/utility/directives';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

//MODELS
// import { SearchOptions } from '@modules/items/models';
import { SellInvoice, SearchInvoice } from "../../models";

// COMPONENT 
import { ConfirmModalComponent } from "@modules/utility/components/confirm-modal/confirm-modal.component";

//SERVICES
import { InvoiceService } from "../../services";
import { AuthService } from "@modules/auth/services";
import { NotificationService } from '@modules/utility/services';

@Component({
  selector: 'sb-ng-bootstrap-table-invoices',
  templateUrl: './ng-bootstrap-table-invoices.component.html',
  styleUrls: ['./ng-bootstrap-table-invoices.component.scss']
})
export class NgBootstrapTableInvoicesComponent implements OnInit {

  public searchOption = new SearchInvoice();
  public invoices: Array<SellInvoice> = [];
  public parameters: any;

  private searchOptionDiffers: KeyValueDiffer<string, any>;

  public sortedColumn!: string;
  public sortedDirection!: string;

  @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

  constructor(
    private differs: KeyValueDiffers, // to get changes in a object
    private notificationService: NotificationService,
    private invoiceService: InvoiceService,
    private authService: AuthService,
    private ngbModal: NgbModal,
  ) {

    this.searchOptionDiffers = this.differs.find(this.searchOption).create();
  }
  
  ngOnInit(): void {

    this.getInvoices();

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


  getInvoices() {

    let parameters = { 'store_id': this.authService.getUserStoreID(), 'searchOption': this.searchOption };

    this.invoiceService.get(parameters).subscribe(response => {

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

  modalDelete(id: string) {
    
    const modalRef = this.ngbModal.open(ConfirmModalComponent, { centered: true, backdrop: 'static' });

    modalRef.componentInstance.title = 'Invoice';
    modalRef.componentInstance.action = 'Anull/Cancel';
    modalRef.componentInstance.value = id;

    modalRef.result.then((result) => {
      result ? this.delete(id) : null;
    });

  }

  delete(id: string) {

    this.invoiceService.delete(id).subscribe(response => {

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

}
