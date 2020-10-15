import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

//MODELS
import { SellInvoice, Invoice } from "../../models";
import { User, SearchUserOptions } from "@modules/users/models";
import { Role } from "@modules/roles/models";
import { PaymentType } from "@modules/payment-types/models";
import { Payment } from "@modules/payments/models";
import { Response } from "@modules/utility/models";

//SERVICES
import { InvoiceService } from '../../services';
import { NotificationService, LanguageService } from '@modules/utility/services';
import { AuthService } from "@modules/auth/services";
import { UserService } from "@modules/users/services";
import { PaymentTypeService } from "@modules/payment-types/services";
import { PaymentService } from "@modules/payments/services";

@Component({
  selector: 'sb-add-aditional-info',
  templateUrl: './add-aditional-info.component.html',
  styleUrls: ['./add-aditional-info.component.scss']
})
export class AddAditionalInfoComponent implements OnInit {

  @Input() invoice_id: number = 0;
  @Input() payment_id: number = 0;

  public invoice = new Invoice();
  public searchUserOption = new SearchUserOptions();
  public externalUser: any;
  public paymentTypes: Array<PaymentType> = [];
  public modalResponse = new Response();

  constructor(
    public activeModal: NgbActiveModal,
    public notificationService: NotificationService,
    public invoiceService: InvoiceService,
    public authService: AuthService,
    public userService: UserService,
    private paymentTypeService: PaymentTypeService,
    private paymentService: PaymentService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.getInvoiceById(this.invoice_id);
    this.getPaymentTypes();
  }

  formatter = (user: User) => user.identification + ' - ' + user.name + ' ' + user.lastname;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(searchValue =>
        this.getUsers(searchValue)
      )
    )

  getUsers(searchValue: string) {

    this.searchUserOption.searchValue = searchValue;
    this.searchUserOption.role_id = Role.getClientID();

    return this.userService.get(this.searchUserOption).pipe(
      map(response => {

        if (response.status) {
          let external_users: Array<User> = [];
          external_users = response.result;
          return external_users;
        } else {
          return []
        }
      }, (error: any) => {
        this.notificationService.error(error);
        this.authService.raiseError();
      }))

  }

  getInvoiceById(id: number) {
    this.invoiceService.getById(id).subscribe(response => {

      if (response.status) {
        this.invoice = response.result;
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
    this.paymentTypeService.getAll().subscribe(response => {
      if (response.status) {
        this.paymentTypes = response.result;
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  save() {

    // this.invoice.id = this.invoice_id;
    this.invoice.external_user_id = this.externalUser?.id;

    this.invoice.serie = this.invoice.serie?.toUpperCase();
    this.updateInvoice(this.invoice);

  }

  updateInvoice(invoice: SellInvoice) {
    this.invoiceService.update(invoice).subscribe(response => {

      if (response.status) {
        this.notificationService.success(response.message);

        if (this.invoice.payment_type_id == PaymentType.getTypeDebit()) {

          if (this.payment_id > 0) {
            this.modalResponse.status = true;
            this.modalResponse.result = { 'payment_id': this.payment_id };
            this.activeModal.close(this.modalResponse);
          } else {
            //create full payment and then go to payment modal
            this.createPaymentCompleted();
          }

        } else {
          //generates credit payments
          this.modalResponse.status = true;
          this.modalResponse.result = { 'credit': true };
          this.activeModal.close(this.modalResponse);
        }

      }
      else {
        this.notificationService.error(response.message);
        this.activeModal.close(this.modalResponse);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  next() {

    if (this.invoice.payment_type_id <= 0) {
      this.notificationService.error(this.languageService.getI18n('invoice.message.selectPaymentType'));
      return;
    }

    if (this.invoice.payment_type_id == PaymentType.getTypeCredit()) {
      if (!this.externalUser) {
        this.notificationService.error(this.languageService.getI18n('invoice.message.invoicePayer'));
        return;
      }
    }

    this.save();
  }

  createPaymentCompleted() {

    let payment = new Payment();

    //assign payment values
    payment.amount = this.invoice.total;
    payment.invoice_id = this.invoice.id;

    this.paymentService.create(payment).subscribe(response => {
      if (response.status) {
        payment.id = response.result?.id;
        this.modalResponse.status = true;
        this.modalResponse.result = { 'payment_id': payment.id };
        this.activeModal.close(this.modalResponse);

      }
      else {
        this.notificationService.error(response.message);
        this.modalResponse.status = false;
        this.activeModal.close(this.modalResponse);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

}
