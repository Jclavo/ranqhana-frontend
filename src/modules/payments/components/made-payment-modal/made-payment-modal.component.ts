import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

//MODELS
import { Payment } from "../../models";
import { PaymentMethod } from "@modules/payment-methods/models";
import { Response } from "@modules/utility/models";

//SERVICES
import { PaymentService } from '../../services';
import { NotificationService, LanguageService } from '@modules/utility/services';
import { AuthService } from "@modules/auth/services";
import { UserService } from "@modules/users/services";
import { PaymentMethodService } from "@modules/payment-methods/services";

@Component({
  selector: 'sb-made-payment-modal',
  templateUrl: './made-payment-modal.component.html',
  styleUrls: ['./made-payment-modal.component.scss']
})
export class MadePaymentModalComponent implements OnInit {

  @Input() payment_id: number = 0;

  public PAYMENT_METHOD_MONEY: number = PaymentMethod.getMethodMoney();
  public PAYMENT_METHOD_CARD: number = PaymentMethod.getMethodCard();


  public payment = new Payment();
  public paymentMethods: Array<PaymentMethod> = [];
  public modalResponse = new Response();

  constructor(
    public activeModal: NgbActiveModal,
    public notificationService: NotificationService,
    public authService: AuthService,
    public userService: UserService,
    private paymentService: PaymentService,
    private paymentMethodService: PaymentMethodService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    
    this.getPaymentById(this.payment_id);
    this.getPaymentTypes();
  }

  getPaymentById(id: number) {
    this.paymentService.getById(id).subscribe(response => {
      if (response.status) {
        this.payment = response.result;
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  getPaymentTypes() {
    this.paymentMethodService.getAll().subscribe(response => {
      if (response.status) {
        this.paymentMethods = response.result;
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  calculateChange() {
    if (this.payment.money < this.payment.amount) {
      this.notificationService.error(this.languageService.getI18n('payment.message.moneyLess'));
      return;
    }

    this.payment.change = this.payment.money - this.payment.amount;
  }

  madePayment() {
    this.savePayment(this.payment);
  }

  savePayment(payment: Payment) {

    this.paymentService.save(payment).subscribe(response => {
      if (response.status) {
        this.notificationService.success(response.message);
        this.modalResponse.status = true;
        this.activeModal.close(this.modalResponse);
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  // back(){

  // }


}
