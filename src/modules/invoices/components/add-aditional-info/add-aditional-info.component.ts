import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//MODELS
import { SellInvoice,  } from "../../models";

//SERVICES
import { NotificationService } from '@modules/utility/services';
import { AuthService } from "@modules/auth/services";
import { InvoiceService } from '../../services';

@Component({
  selector: 'sb-add-aditional-info',
  templateUrl: './add-aditional-info.component.html',
  styleUrls: ['./add-aditional-info.component.scss']
})
export class AddAditionalInfoComponent implements OnInit {

  @Input() invoice_id: string = "";

  public invoice = new SellInvoice();
  
  constructor(
    public activeModal: NgbActiveModal,
    public notificationService: NotificationService,
    public invoiceService: InvoiceService,
    public authService: AuthService,
  ) { }
 
  ngOnInit(): void {
  }

  print(){

  }

  save(){

    this.invoice.id = this.invoice_id;

    if(this.invoice.serie || this.invoice.client){
      this.invoice.serie = this.invoice.serie.toUpperCase();
      this.updateInvoice(this.invoice);
    }else{
      this.activeModal.close(true);
    }
  }

  updateInvoice(invoice: SellInvoice){
    this.invoiceService.updateInvoice(invoice).subscribe(response => {

      if (response.status) {
        this.notificationService.success(response.message);
        this.activeModal.close(true);
      }
      else {
        this.notificationService.error(response.message);
        this.activeModal.close(false);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

}