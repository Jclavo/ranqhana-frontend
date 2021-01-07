import { Component, OnInit } from '@angular/core';

//SERVICES
import { ReportService } from "@modules/reports/services";
import { NotificationService, CustomDateService } from '@modules/utility/services';
import { AuthService } from "@modules/auth/services";
import { InvoiceTypeService } from "@modules/invoice-types/services";
import { PaymentTypeService } from "@modules/payment-types/services";

//MODEL
import { SearchInvoice } from "@modules/invoices/models";
import { Graphic } from '@modules/utility/models';
import { InvoiceType } from '@modules/invoice-types/models';
import { PaymentType } from '@modules/payment-types/models';


@Component({
  selector: 'sb-invoice-money-by-payment-type',
  templateUrl: './invoice-money-by-payment-type.component.html',
  styleUrls: ['./invoice-money-by-payment-type.component.scss']
})
export class InvoiceMoneyByPaymentTypeComponent implements OnInit {

  public searchInvoiceOption = new SearchInvoice();
  public graphicData: Array<Graphic> = [];
  public invoiceTypes: Array<InvoiceType> = [];
  public paymentTypes: Array<PaymentType> = [];

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService,
    private customDateService: CustomDateService,
    private reportService: ReportService,
    private invoiceTypeService: InvoiceTypeService,
    private paymentTypeService: PaymentTypeService
  ) {
    this.searchInvoiceOption.fromDate = this.searchInvoiceOption.toDate = this.customDateService.getToday();
  }

  async ngOnInit() {

    this.searchInvoiceOption.searchBy = 'Y';

    this.getInvoiceTypes();

    await this.search();

  }

  async search() {

    this.graphicData = [];

    await this.getPaymentTypes();

    await this.getInvoiceMoney(PaymentType.getForDebit());
    await this.getInvoiceMoney(PaymentType.getForCredit());
    await this.getInvoiceMoney(PaymentType.getForCash());
    await this.getInvoiceMoney(PaymentType.getForInternalCredit());

    await this.getInvoiceMoney();

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

  async getPaymentTypes() {

    await this.paymentTypeService.getAll().toPromise().then(response => {

      if (response.status) {
        this.paymentTypes = response.result;
      } else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });

  }

  getPaymentTypeName(payment_type_id: number) {

    let paymentType = this.paymentTypes.find(function (element) {
      return element.id == payment_type_id;
    });

    return paymentType?.name ?? 'Total';
  }


  async getInvoiceMoney(payment_type_id: number = 0) {

    this.searchInvoiceOption.payment_type_id = payment_type_id;

    await this.reportService.invoiceMoney(this.searchInvoiceOption).toPromise().then(response => {

      if (response.status) {

        let graphicData = new Graphic();
        graphicData.X = this.getPaymentTypeName(payment_type_id);
        graphicData.Y = response.result[0]?.Y ?? 0;

        this.graphicData.push(graphicData);

      } else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

}
