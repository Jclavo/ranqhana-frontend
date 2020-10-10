import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { PaymentMethodsModule } from './payment-methods.module';

/* Containers */
import * as paymentMethodsContainers from './containers';

/* Guards */
// import * as tablesGuards from './guards';
import { SBRouteData } from '@modules/navigation/models';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: paymentMethodsContainers.PaymentMethodListComponent,
        data: {
            title: 'Payment Method List - Store App',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Payment Method',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
];

@NgModule({
  imports: [PaymentMethodsModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class PaymentMethodsRoutingModule { }
