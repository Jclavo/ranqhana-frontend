import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

//MODELS
import { Payment, Installment } from "../../models";
import { Response } from "@modules/utility/models";
import { Invoice } from "@modules/invoices/models";
// import { Invoice } from "@modules/p";

//SERVICES
import { PaymentService } from '../../services';
import { CustomDateService, NotificationService } from '@modules/utility/services';
import { AuthService } from "@modules/auth/services";
import { UserService } from "@modules/users/services";
import { InvoiceService } from "@modules/invoices/services";

// COMPONENT 
import { MadePaymentModalComponent } from "../../components/made-payment-modal/made-payment-modal.component";

//UTILS
import { FormUtils } from '@modules/utility/utils';

@Component({
  selector: 'sb-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  // @Input() invoice_id: number = 0;

  public payments: Array<Payment> = [];
  private invoice = new Invoice();
  public installment = new Installment();

  constructor(
    public notificationService: NotificationService,
    public authService: AuthService,
    public userService: UserService,
    private paymentService: PaymentService,
    private invoiceService: InvoiceService,
    private customDateService: CustomDateService,
    private ngbModal: NgbModal,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public formUtils: FormUtils
  ) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.invoice.id = Number(this.activatedRoute.snapshot.paramMap.get('invoice_id'));
    this.loadInitial(this.invoice.id);
  }

  loadInitial(invoice_id: number){
    this.getInvoiceById(invoice_id);
    this.getPaymentByInvoice(invoice_id);
  }

  getInvoiceById(id: number) {
    this.invoiceService.getById(id).subscribe(response => {

      if (response.status) {
        this.invoice = response.result;
        if (this.invoice) {
          this.installment.total = response.result.total;
          this.installment.remain = response.result.total;
        }

      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  getPaymentByInvoice(id: number) {
    this.paymentService.getByInvoiceId(id).subscribe(response => {

      if (response.status) {
        this.payments = response.result;
        this.calculateRemain();
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  generatePayments() {

    //validations
    if (this.installment.remain == 0) {
      this.notificationService.error('There is no remain to add more payments.');
      return;
    }

    if (this.installment.quantity <= 0) {
      this.notificationService.error('The installments quantity should be one or more.');
      return;
    }

    if (this.installment.money <= 0 || ((this.installment.money * this.installment.quantity) > this.installment.remain)) {
      this.notificationService.error('The installments money should be in total range.');
      return;
    }

    //generate
    // this.payments = [];
    // let remain = this.installment.total;
    for (let index = 0; index < this.installment.quantity; index++) {
      let newPayment = new Payment();

      if (index == this.installment.quantity - 1) {
        newPayment.amount = this.installment.remain;
      } else {
        newPayment.amount = this.installment.money;
      }

      newPayment.payment_date = this.customDateService.getToday();
      newPayment.invoice_id = this.invoice.id;
      // newPayment.payment_method_id
      // newPayment.payment_stage_id
      this.installment.remain -= Number(newPayment.amount);

      this.payments.push(newPayment);

    }

    this.installment.quantity = 0;
    this.installment.money = 0.0;

  }

  validateInstallment() {
    this.installment.money = Math.floor(this.installment.remain / this.installment.quantity);
  }

  delete(index: number, payment_id: number) {

    if (payment_id > 0) {
      this.deletePayment(index, payment_id);
    } else {
      this.deleteLocal(index);
    }

  }

  deleteLocal(index: number) {
    this.installment.remain += Number(this.payments[index].amount);
    this.payments.splice(index, 1);
  }

  reset() {
    // this.payments = [];
    // this.installment.remain = this.installment.total;

    this.payments = this.payments.filter(function (value: any) {
      return value.id > 0;
    });

    this.installment.quantity = 0;
    this.installment.money = 0.0;
    this.calculateRemain();

  }

  save() {

    if (this.installment.remain > 0) {
      this.notificationService.error('There is still a remain, please create all the payments.');
      return;
    }

    for (let index = 0; index < this.payments.length; index++) {
      if (this.payments[index].id == 0) {
        this.createPayment(this.payments[index]);
      }
    }

    this.loadInitial(this.invoice.id);
  }

  createPayment(payment: Payment) {

    this.paymentService.create(payment).subscribe(response => {
      if (response.status) {
        this.notificationService.success(response.message);
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  deletePayment(index: number, id: Number) {

    this.paymentService.delete(id).subscribe(response => {
      if (response.status) {
        this.notificationService.success(response.message);
        this.deleteLocal(index);
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  calculateRemain() {
    let total = 0;
    for (let index = 0; index < this.payments.length; index++) {
      total += Number(this.payments[index].amount);
    }
    this.installment.remain = this.installment.total - total;
  }

  openModalMadePayment(payment_id: Number) {
    const modalRef = this.ngbModal.open(MadePaymentModalComponent, { centered: true, backdrop: 'static' });

    modalRef.componentInstance.payment_id = payment_id;

    modalRef.result.then((result: Response) => {

      if (result.status) {
        this.loadInitial(this.invoice.id);
      }

    });
  }

  finish(){
    this.router.navigate(['/invoices', this.invoice.getType()])
  }

}
