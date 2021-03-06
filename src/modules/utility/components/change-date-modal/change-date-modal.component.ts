import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//MODELS
import { Response } from '@modules/utility/models';
import { Order } from '@modules/orders/models';
import { Payment } from '@modules/payments/models';

//SERVICES
import { OrderService } from "@modules/orders/services";
import { PaymentService } from "@modules/payments/services";
import { AuthService } from '@modules/auth/services';
import { NotificationService, CustomDateService, LanguageService } from '@modules/utility/services';

@Component({
  selector: 'sb-change-date-modal',
  templateUrl: './change-date-modal.component.html',
  styleUrls: ['./change-date-modal.component.scss']
})
export class ChangeDateModalComponent implements OnInit {

  @Input() model: string = '';
  @Input() model_id: number = 0;
  @Input() date: string = '';

  public modalResponse = new Response();

  constructor(
    public activeModal: NgbActiveModal,
    private authService: AuthService,
    private notificationService: NotificationService,
    private orderService: OrderService,
    private customDateService: CustomDateService,
    private languageService: LanguageService,
    private paymentService: PaymentService
  ) { }


  ngOnInit(): void {
  }

  change() {

    if (!this.customDateService.validateShortDate(this.date)) {
      this.notificationService.error(this.languageService.getI18n('changeDateModal.message.pastDate'));
      return;
    }

    switch (this.model) {
      case Order.getModelName():
        let order = new Order();
        order.id = this.model_id;
        order.delivery_date = this.date;
        this.updateDeliveryDate(order);
        break;
      case Payment.getModelName():
        let payment = new Payment();
        payment.id = this.model_id;
        payment.payment_date = this.date;
        this.updatePaymentDate(payment);
        break;

      default:
        break;
    }
  }

  updateDeliveryDate(order: Order) {
    this.orderService.updateDeliveryDate(order).subscribe(async response => {

      if (response.status) {
        this.notificationService.success(response.message);

        this.modalResponse.status = true;
        this.activeModal.close(this.modalResponse);

      } else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }


  updatePaymentDate(payment: Payment) {
    this.paymentService.updatePaymentDate(payment).subscribe(async response => {

      if (response.status) {
        this.notificationService.success(response.message);

        this.modalResponse.status = true;
        this.activeModal.close(this.modalResponse);

      } else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }




}
