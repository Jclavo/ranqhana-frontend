import { Component, OnInit } from '@angular/core';

//SERVICES
import { ReportService } from "@modules/reports/services";
import { NotificationService, CustomDateService } from '@modules/utility/services';
import { AuthService } from "@modules/auth/services";

//MODEL
import { SearchInvoice } from "@modules/invoices/models";
import { Graphic } from "@modules/utility/models";
import { Item } from "@modules/items/models";

@Component({
    selector: 'sb-dashboard-cards',
    templateUrl: './dashboard-cards.component.html',
    styleUrls: ['dashboard-cards.component.scss'],
})
export class DashboardCardsComponent implements OnInit {

    // public searchInvoiceOption = new SearchInvoice();
   
    // public dailySales: number = 0;
    public dailySales = {value: '-'};
    public popularItem = {value: '-'};
    

    constructor(
        private reportService: ReportService,
        private notificationService: NotificationService,
        private authService: AuthService,
        private customDateService: CustomDateService
    ) {

        
    }


    ngOnInit(): void {
        this.getInvoiceMoney();
        this.getPopularItems()
    }


    getInvoiceMoney() {

        let graphicData: Array<Graphic> = [];
        //set parameters to search
        let searchInvoiceOption = new SearchInvoice();
        searchInvoiceOption.fromDate = searchInvoiceOption.toDate = this.customDateService.getToday();
        searchInvoiceOption.searchBy = 'D';

        this.reportService.invoiceMoney(searchInvoiceOption).subscribe(response => {

            if (response.status) {
                graphicData = response.result;
                if(graphicData.length > 0){
                    this.dailySales.value = graphicData[0]?.Y?.toString();
                }
                ;

            } else {
                this.notificationService.error(response.message);
            }

        }, error => {
            this.notificationService.error(error);
            this.authService.raiseError();
        });
    }

    getPopularItems() {

        let items: Array<Item> = [];
         //set parameters to search
         let searchInvoiceOption = new SearchInvoice();
         searchInvoiceOption.fromDate = searchInvoiceOption.toDate = this.customDateService.getToday();

        this.reportService.popularItems(searchInvoiceOption).subscribe(response => {

            if (response.status) {
                items = response.result;
                if(items.length > 0){
                    // this.popularItem.value = '#' + items[0]?.id + ' - ' + items[0]?.name;
                    this.popularItem.value = items[0]?.name;
                }

            } else {
                this.notificationService.error(response.message);
            }

        }, error => {
            this.notificationService.error(error);
            this.authService.raiseError();
        });
    }
}
