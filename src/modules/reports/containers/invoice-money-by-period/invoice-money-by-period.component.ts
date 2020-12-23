import { Component, OnInit } from '@angular/core';

//SERVICES
import { ReportService } from "@modules/reports/services";
import { NotificationService, CustomDateService } from '@modules/utility/services';
import { AuthService } from "@modules/auth/services";
import { InvoiceTypeService } from "@modules/invoice-types/services";

//MODEL
import { SearchInvoice } from "@modules/invoices/models";
import { Graphic } from '@modules/utility/models';
import { InvoiceType } from '@modules/invoice-types/models';

@Component({
  selector: 'sb-invoice-money-by-period',
  templateUrl: './invoice-money-by-period.component.html',
  styleUrls: ['./invoice-money-by-period.component.scss']
})
export class InvoiceMoneyByPeriodComponent implements OnInit {

  public searchInvoiceOption = new SearchInvoice();
  public graphicData: Array<Graphic> = [];
  public invoiceTypes: Array<InvoiceType> = [];

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService,
    private customDateService: CustomDateService,
    private reportService: ReportService,
    private invoiceTypeService: InvoiceTypeService,
  ) {
    this.searchInvoiceOption.fromDate = this.searchInvoiceOption.toDate = this.customDateService.getToday();
  }

  ngOnInit(): void {
    this.search();
    this.getInvoiceTypes();
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

  search() {

    this.reportService.invoiceMoney(this.searchInvoiceOption).subscribe(response => {

      if (response.status) {
        this.graphicData = response.result;
      } else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

}
