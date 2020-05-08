import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//MODELS
import { Invoice } from "../../models";

//SERVICES
import { NotificationService } from '@modules/utility/services';
import { AuthService } from "@modules/auth/services";
import { InvoiceService, InvoiceDetailService } from '../../services';

@Component({
  selector: 'sb-show-invoice',
  templateUrl: './show-invoice.component.html',
  styleUrls: ['./show-invoice.component.scss']
})
export class ShowInvoiceComponent implements OnInit {

  @Input() invoice_id: number = 0;

  public invoice = new Invoice();
  public invoiceDetails: Array<Invoice> = [];

  constructor(
    public activeModal: NgbActiveModal,
    public notificationService: NotificationService,
    public authService: AuthService,
    public invoiceService: InvoiceService,
    public invoiceDetailService: InvoiceDetailService,
  ) { }

  ngOnInit(): void {
    this.getInvoice(this.invoice_id);
    this.getInvoiceDetails(this.invoice_id);
  }

  getInvoice(invoice_id: number) {
    this.invoiceService.getById(invoice_id).subscribe(async response => {

      if(response.status){
        this.invoice = response.result
      }else{
        this.activeModal.close(false)
        this.notificationService.error(response.message);
      } 

    }, error => {
      this.activeModal.close(false)
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  getInvoiceDetails(invoice_id: number) {
    this.invoiceDetailService.getById(invoice_id).subscribe(async response => {

      if(response.status){
        this.invoiceDetails = response.result
      }else{
        this.activeModal.close(false)
        this.notificationService.error(response.message);
      }

    }, error => {
      this.activeModal.close(false)
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

}
