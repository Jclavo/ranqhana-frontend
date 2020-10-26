import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { InvoiceStagesModule } from './invoice-stages.module';

/* Containers */
import * as invoiceStagesContainers from './containers';

/* Guards */
// import * as tablesGuards from './guards';
import { SBRouteData } from '@modules/navigation/models';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: invoiceStagesContainers.InvoiceStageListComponent,
        data: {
            title: 'Invoice Stages List - Store App',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Invoice Stages',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
];

@NgModule({
  imports: [InvoiceStagesModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class InvoiceStagesRoutingModule { }
