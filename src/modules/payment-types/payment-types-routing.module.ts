import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { ItemsModule } from './items.module';

/* Containers */
import * as paymentTypesContainers from './containers';

/* Guards */
// import * as tablesGuards from './guards';
import { SBRouteData } from '@modules/navigation/models';

/* Routes */
export const ROUTES: Routes = [
  {
      path: '',
      canActivate: [],
      component: paymentTypesContainers.PaymentListComponent,
      data: {
          title: 'Payment Types List - Store App',
          breadcrumbs: [
              {
                  text: 'Dashboard',
                  link: '/dashboard',
              },
              {
                  text: 'Payment Types',
                  active: true,
              },
          ],
      } as SBRouteData,
  },
];

@NgModule({
  imports: [ItemsModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class PaymentTypesRoutingModule { }
