import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { PaymentsModule } from './payments.module';

/* Containers */
import * as paymentsContainers from './containers';

/* Guards */
// import * as tablesGuards from './guards';
import { SBRouteData } from '@modules/navigation/models';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: paymentsContainers.PaymentsListComponent,
        data: {
            title: 'Payments List - Store App',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Payment',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    {
        path: ':invoice_id',
        // canActivate: [GlobalGuard],
        component: paymentsContainers.PaymentComponent,
        data: {
          title: 'Payment - Store App',
          breadcrumbs: [
            {
              text: 'Dashboard',
              link: '/dashboard',
            },
            {
              text: 'Payment',
              active: true,
            },
          ],
        } as SBRouteData,
      },
];

@NgModule({
  imports: [PaymentsModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
