import { Component, OnInit, KeyValueDiffer, KeyValueDiffers } from '@angular/core';

//SERVICES
import { InvoiceService } from "../../services/invoice.service";
import { NotificationService, CustomDateService } from '@modules/utility/services';
import { AuthService } from "@modules/auth/services";

//MODEL
import { SearchInvoice } from "../../models";
import { Graphic } from '@modules/utility/models';

@Component({
  selector: 'sb-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  public searchInvoiceOption = new SearchInvoice();
  public graphicData: Array<Graphic> = [];

  constructor(
    private invoiceService: InvoiceService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private customDateService: CustomDateService
    ) { 
      this.searchInvoiceOption.fromDate = this.searchInvoiceOption.toDate = this.customDateService.getToday();
    }

  ngOnInit(): void {
    this.search();
  }


  search(){

    this.invoiceService.report(this.searchInvoiceOption).subscribe(response => {

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
