import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

//MODELS
import { Payment, Installment } from "../../models";
import { Response } from "@modules/utility/models";
import { Invoice } from "@modules/invoices/models";
import { PaymentStage } from "@modules/payment-stages/models";

//SERVICES
import { PaymentService } from '../../services';
import { CustomDateService, NotificationService, LanguageService } from '@modules/utility/services';
import { AuthService } from "@modules/auth/services";
import { UserService } from "@modules/users/services";
import { InvoiceService } from "@modules/invoices/services";

// COMPONENT 
import { MadePaymentModalComponent } from "../../components/made-payment-modal/made-payment-modal.component";
import { ConfirmModalComponent } from '@modules/utility/components';
import { ChangeDateModalComponent } from "@modules/utility/components/change-date-modal/change-date-modal.component";

//UTILS
import { FormUtils } from '@modules/utility/utils';

@Component({
  selector: 'sb-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  public PAYMENT_STAGE_PAID: number = PaymentStage.getStagePaid();

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
    public formUtils: FormUtils,
    private languageService: LanguageService
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

  validateInstallment() {
    if(this.installment.quantity > 0){
      this.installment.money = Math.floor(this.installment.remain / this.installment.quantity);
    }
  }

  reset() {
    this.payments = this.payments.filter(function (value: any) {
      return value.id > 0;
    });

    this.installment.quantity = 0;
    this.installment.money = 0.0;
    this.calculateRemain();
  }

  calculateRemain() {
    let total = 0;
    for (let index = 0; index < this.payments.length; index++) {
      total += Number(this.payments[index].amount);
    }
    this.installment.remain = this.installment.total - total;
  }

  finish(){
    this.router.navigate(['/invoices', this.invoice.getType()])
  }

  getInvoiceById(id: number) {
    this.invoiceService.getById(id).subscribe(response => {

      if (response.status) {
        this.invoice = response.result;
        if (this.invoice) {
          this.installment.total = response.result.total;
          // this.installment.remain = response.result.total;
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
      this.notificationService.error(this.languageService.getI18n('payment.message.noRemain'));
      return;
    }

    if (this.installment.quantity <= 0) {
      this.notificationService.error(this.languageService.getI18n('payment.message.quantityEmpty'));
      return;
    }

    if (this.installment.money <= 0 || ((this.installment.money * this.installment.quantity) > this.installment.remain)) {
      this.notificationService.error(this.languageService.getI18n('payment.message.moneyInRange'));
      return;
    }

    //generate
    for (let index = 0; index < this.installment.quantity; index++) {
      let newPayment = new Payment();

      if (index == this.installment.quantity - 1) {
        newPayment.amount = this.installment.remain;
      } else {
        newPayment.amount = this.installment.money;
      }

      newPayment.payment_date = this.customDateService.getToday();
      newPayment.invoice_id = this.invoice.id;
      // newPayment.method_id
      // newPayment.stage_id
      this.installment.remain -= Number(newPayment.amount);

      this.payments.push(newPayment);

    }

    this.installment.quantity = 0;
    this.installment.money = 0.0;

  }

  save() {

    if (this.installment.remain > 0) {
      this.notificationService.error(this.languageService.getI18n('payment.message.stillRemain'));
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

  openModalMadePayment(payment_id: Number) {
    const modalRef = this.ngbModal.open(MadePaymentModalComponent, { centered: true, backdrop: 'static' });

    modalRef.componentInstance.payment_id = payment_id;

    modalRef.result.then((result: Response) => {

      if (result.status) {
        this.loadInitial(this.invoice.id);
      }

    });
  }

  modalDelete(index: number, payment_id: number, name: string) {
    
    const modalRef = this.ngbModal.open(ConfirmModalComponent, { centered: true, backdrop: 'static' });

    modalRef.componentInstance.title = this.languageService.getI18n('payment.field.payment');
    modalRef.componentInstance.action = this.languageService.getI18n('button.delete');
    modalRef.componentInstance.value = name;

    modalRef.result.then((result) => {
      result ? this.delete(index, payment_id) : null;
    });
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

  modalUpdateDate(payment_id: number, date: string) {
    const modalRef = this.ngbModal.open(ChangeDateModalComponent, { centered: true, backdrop: 'static' });

    modalRef.componentInstance.model = Payment.getModelName();
    modalRef.componentInstance.model_id = payment_id;
    modalRef.componentInstance.date = this.customDateService.formatDDMMYYYYtoYYYYMMDD(date);

    modalRef.result.then((result: Response) => {
      result.status ? this.getPaymentByInvoice(this.invoice.id) : null;
    });
  }

}
