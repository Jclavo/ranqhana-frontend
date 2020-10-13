import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { PaymentStagesModule } from './payment-stages.module';

/* Containers */
import * as paymentStagesContainers from './containers';

/* Guards */
// import * as tablesGuards from './guards';
import { SBRouteData } from '@modules/navigation/models';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: paymentStagesContainers.PaymentStageListComponent,
        data: {
            title: 'Payment Stages List - Store App',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Payment Stages',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
];

@NgModule({
  imports: [PaymentStagesModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class PaymentStagesRoutingModule { }
