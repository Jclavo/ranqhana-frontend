import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { ReportsModule } from './reports.module';

/* Containers */
import * as reportsContainers from './containers';

/* Guards */
// import * as tablesGuards from './guards';
import { SBRouteData } from '@modules/navigation/models';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: reportsContainers.ReportListComponent,
        data: {
            title: 'Report List - Store App',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Report',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    {
        path: 'invoice-money-by-payment-type',
        canActivate: [],
        component: reportsContainers.InvoiceMoneyByPaymentTypeComponent,
        data: {
            title: 'Invoice Money by Payment Type - Store App',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Invoice Money by Payment Type',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    {
        path: 'invoice-money-by-period',
        canActivate: [],
        component: reportsContainers.InvoiceMoneyByPeriodComponent,
        data: {
            title: 'Invoice Money by Period - Store App',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Invoice Money by Payment Period',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
];

@NgModule({
  imports: [ReportsModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
