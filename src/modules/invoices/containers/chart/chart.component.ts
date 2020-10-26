import { Component, OnInit, KeyValueDiffer, KeyValueDiffers } from '@angular/core';

//SERVICES
import { InvoiceService } from "../../services/invoice.service";
import { ReportService } from "@modules/reports/services";
import { NotificationService, CustomDateService } from '@modules/utility/services';
import { AuthService } from "@modules/auth/services";
import { InvoiceTypeService } from "@modules/invoice-types/services";

//MODEL
import { SearchInvoice } from "../../models";
import { Graphic } from '@modules/utility/models';
import { InvoiceType } from '@modules/invoice-types/models';

@Component({
  selector: 'sb-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  public searchInvoiceOption = new SearchInvoice();
  public graphicData: Array<Graphic> = [];
  public invoiceTypes: Array<InvoiceType> = [];

  constructor(
    private invoiceService: InvoiceService,
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


  search(){

    this.reportService.invoiceMoney(this.searchInvoiceOption).subscribe(response => {

      if (response.status) {
        this.graphicData = response.result;
        // console.log('this.graphicData', this.graphicData);

      }else{
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

}
