import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

//MODELS
import { Response } from "@modules/utility/models";
import { SellInvoice, Invoice } from "../../models";
import { User, SearchUserOptions } from "@modules/users/models";
import { PaymentType } from "@modules/payment-types/models";
import { Payment } from "@modules/payments/models";
import { Person } from "@modules/persons/models";

//SERVICES
import { InvoiceService } from '../../services';
import { NotificationService, LanguageService } from '@modules/utility/services';
import { AuthService } from "@modules/auth/services";
import { UserService } from "@modules/users/services";
import { PersonService } from "@modules/persons/services";
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

  public PAYMENT_TYPE_FOR_CASH = PaymentType.getForCash();

  public invoice = new Invoice();
  public searchUserOption = new SearchUserOptions();
  public externalPerson = new Person();
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
    private languageService: LanguageService,
    private personService: PersonService
  ) { }

  ngOnInit(): void {
    this.getInvoiceById(this.invoice_id);
    this.getPaymentTypes();
  }

  formatter = (person: Person) => person.identification + ' ' + person.name + ' ' + (person.lastname ?? '');

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(searchValue =>
        this.getPersons(searchValue)
      )
    )

  getPersons(searchValue: string) {

    // this.searchUserOption.searchValue = searchValue;
    this.searchUserOption.identification = searchValue;
    this.searchUserOption.country_code = this.authService.getCompanyCountryCode();
    this.searchUserOption.pageSize = 5;

    return this.personService.get(this.searchUserOption).pipe(
      map(response => {

        if (response.status) {
          let external_users: Array<Person> = [];
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
        this.invoice.payment_type_id = this.authService.getCompanyPaymentTypeID();
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

  updateInvoice(invoice: SellInvoice) {
    this.invoiceService.update(invoice).subscribe(response => {

      if (response.status) {
        this.notificationService.success(response.message);

        if (this.invoice.payment_type_id == PaymentType.getForInternalCredit()) {
          this.modalResponse.status = true;
          this.modalResponse.result = { 'type_id': this.invoice.payment_type_id };
          this.activeModal.close(this.modalResponse);
        } else {

          if (this.payment_id > 0) {
            this.modalResponse.status = true;
            this.modalResponse.result = { 'type_id': this.invoice.payment_type_id, 'payment_id': this.payment_id };
            this.activeModal.close(this.modalResponse);
          } else {
            //create full payment and then go to payment modal
            this.createPaymentCompleted();
          }
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

    // if (this.invoice.payment_type_id == PaymentType.getForCredit()) {
    //   if (this.externalPerson.universal_person_id == 0 || this.externalPerson.universal_person_id == undefined) {
    //     this.notificationService.error(this.languageService.getI18n('invoice.message.invoicePayer'));
    //     return;
    //   }
    // }

    this.invoice.external_user_id = this.externalPerson?.id;

    this.updateInvoice(this.invoice);
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
        this.modalResponse.result = { 'type_id': this.invoice.payment_type_id, 'payment_id': payment.id };
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
