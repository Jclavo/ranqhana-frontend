import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { InvoicesModule } from './invoices.module';

/* Containers */
import * as invoicesContainers from './containers';

/* Guards */
import { GlobalGuard } from '@modules/utility/guards';

/* Routes */
export const ROUTES: Routes = [
  {
    path: 'sell',
    canActivate: [GlobalGuard],
    component: invoicesContainers.SellComponent,
    data: {
      title: 'Sell Invoice - Store App',
      breadcrumbs: [
        {
          text: 'Dashboard',
          link: '/dashboard',
        },
        {
          text: 'Sell Invoice',
          active: true,
        },
      ],
    } as SBRouteData,
  },
  // {
  //     path: 'item/:id',
  //     canActivate: [GlobalGuard],
  //     component: invoicesContainers.*,
  //     data: {
  //         title: 'Edit Item - Store App',
  //         breadcrumbs: [
  //             {
  //                 text: 'Dashboard',
  //                 link: '/dashboard',
  //             },
  //             {
  //                 text: 'Edit Item',
  //                 active: true,
  //             },
  //         ],
  //     } as SBRouteData,
  // },
];

@NgModule({
  imports: [InvoicesModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
