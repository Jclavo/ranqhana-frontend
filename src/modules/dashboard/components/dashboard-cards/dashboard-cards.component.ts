import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

//SERVICES
import { ReportService } from "@modules/reports/services";
import { NotificationService, CustomDateService } from '@modules/utility/services';
import { AuthService } from "@modules/auth/services";

//MODEL
import { SearchInvoice } from "@modules/invoices/models";
import { Graphic } from "@modules/utility/models";
import { Item } from "@modules/items/models";
import { InvoiceType } from "@modules/invoice-types/models";

//UTILS
import { FormUtils } from "@modules/utility/utils";

@Component({
    selector: 'sb-dashboard-cards',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-cards.component.html',
    styleUrls: ['dashboard-cards.component.scss'],
})
export class DashboardCardsComponent implements OnInit {

    public dailySale = { value: '-' };
    public dailyPurchase = { value: '-' };
    public popularItem = { value: '-' };
    public popularProduction = { value: '-' };

    constructor(
        private reportService: ReportService,
        private notificationService: NotificationService,
        private authService: AuthService,
        private customDateService: CustomDateService,
        private formUtils: FormUtils
    ) {

    }

    ngOnInit(): void {
        this.getDailySale();
        this.getDailyPurchase();
        this.getPopularItems()
    }


    getDailySale() {

        let graphicData: Array<Graphic> = [];
        //set parameters to search
        let searchInvoiceOption = new SearchInvoice();
        searchInvoiceOption.fromDate = searchInvoiceOption.toDate = this.customDateService.getToday();
        searchInvoiceOption.type_id = InvoiceType.getForSell();
        searchInvoiceOption.searchBy = 'D';

        this.reportService.invoiceMoney(searchInvoiceOption).subscribe(response => {

            if (response.status) {
                graphicData = response.result;
                if (graphicData.length > 0) {
                    this.dailySale.value = this.formUtils.customToFixed(graphicData[0]?.Y).toString();
                }

            } else {
                this.notificationService.error(response.message);
            }

        }, error => {
            this.notificationService.error(error);
            this.authService.raiseError();
        });
    }

    getDailyPurchase() {

        let graphicData: Array<Graphic> = [];
        //set parameters to search
        let searchInvoiceOption = new SearchInvoice();
        searchInvoiceOption.fromDate = searchInvoiceOption.toDate = this.customDateService.getToday();
        searchInvoiceOption.type_id = InvoiceType.getForPurchase();
        searchInvoiceOption.searchBy = 'D';

        this.reportService.invoiceMoney(searchInvoiceOption).subscribe(response => {

            if (response.status) {
                graphicData = response.result;
                if (graphicData.length > 0) {
                    this.dailyPurchase.value = this.formUtils.customToFixed(graphicData[0]?.Y).toString();
                }

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
        searchInvoiceOption.type_id = InvoiceType.getForSell();
        searchInvoiceOption.searchBy = 'D';

        this.reportService.popularItems(searchInvoiceOption).subscribe(response => {

            if (response.status) {
                items = response.result;
                if (items.length > 0) {
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
