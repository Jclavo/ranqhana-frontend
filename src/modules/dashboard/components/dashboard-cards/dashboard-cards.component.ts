import { Component, OnInit } from '@angular/core';

//SERVICES
import { ReportService } from "@modules/reports/services";
import { NotificationService, CustomDateService } from '@modules/utility/services';
import { AuthService } from "@modules/auth/services";

//MODEL
import { SearchInvoice } from "@modules/invoices/models";
import { Graphic } from "@modules/utility/models";

@Component({
    selector: 'sb-dashboard-cards',
    templateUrl: './dashboard-cards.component.html',
    styleUrls: ['dashboard-cards.component.scss'],
})
export class DashboardCardsComponent implements OnInit {

    public searchInvoiceOption = new SearchInvoice();
    public graphicData: Array<Graphic> = [];
    // public dailySales: number = 0;
    public dailySales = {value: 0};
    

    constructor(
        private reportService: ReportService,
        private notificationService: NotificationService,
        private authService: AuthService,
        private customDateService: CustomDateService
    ) {

        //set parameters to search
        this.searchInvoiceOption.fromDate = this.searchInvoiceOption.toDate = this.customDateService.getToday();
        this.searchInvoiceOption.searchBy = 'D';
    }


    ngOnInit(): void {
        this.search();
    }


    search() {

        this.reportService.invoiceMoney(this.searchInvoiceOption).subscribe(response => {

            if (response.status) {
                this.graphicData = response.result;
                if(this.graphicData.length > 0){
                    this.dailySales.value = this.graphicData[0]?.Y;
                }
                console.log('this.dailySales', this.dailySales);

            } else {
                this.notificationService.error(response.message);
            }

        }, error => {
            this.notificationService.error(error);
            this.authService.raiseError();
        });
    }
}
