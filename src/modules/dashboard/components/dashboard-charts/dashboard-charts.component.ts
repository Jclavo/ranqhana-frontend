import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

//SERVICES
import { ReportService } from "@modules/reports/services";
import { NotificationService, CustomDateService } from '@modules/utility/services';
import { AuthService } from "@modules/auth/services";

//MODEL
import { SearchInvoice } from "@modules/invoices/models";
import { Graphic } from "@modules/utility/models";

@Component({
    selector: 'sb-dashboard-charts',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-charts.component.html',
    styleUrls: ['dashboard-charts.component.scss'],
})
export class DashboardChartsComponent implements OnInit {
    
    public graphicDataForSaleInvoiceMoney: Array<Graphic> = [];
    public graphicDataForSaleInvoiceByMonth: Array<Graphic> = [];

    constructor(
        private reportService: ReportService,
        private notificationService: NotificationService,
        private authService: AuthService,
        private customDateService: CustomDateService
    ) {
 
    }

    ngOnInit() {
        this.getSaleInvoiceMoney();
        this.getSaleInvoiceByMonth();
    }
    
    
    getSaleInvoiceMoney() {

        //set parameters to search
        let searchInvoiceOption = new SearchInvoice();
        searchInvoiceOption.fromDate = searchInvoiceOption.toDate = this.customDateService.getToday();

        this.reportService.invoiceMoney(searchInvoiceOption).subscribe(response => {

            if (response.status) {
                this.graphicDataForSaleInvoiceMoney = response.result;

            } else {
                this.notificationService.error(response.message);
            }

        }, error => {
            this.notificationService.error(error);
            this.authService.raiseError();
        });
    }

    getSaleInvoiceByMonth() {

        //set parameters to search
        let searchInvoiceOption = new SearchInvoice();
        searchInvoiceOption.fromDate = this.customDateService.substractDaysFromToday(1);
        searchInvoiceOption.toDate = this.customDateService.getToday();
        searchInvoiceOption.searchBy = "M";

        this.reportService.invoiceMoney(searchInvoiceOption).subscribe(response => {

            if (response.status) {
                this.graphicDataForSaleInvoiceByMonth = response.result;

            } else {
                this.notificationService.error(response.message);
            }

        }, error => {
            this.notificationService.error(error);
            this.authService.raiseError();
        });
    }
}
