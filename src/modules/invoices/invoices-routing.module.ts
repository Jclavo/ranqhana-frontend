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
    path: '',
    canActivate: [GlobalGuard],
    component: invoicesContainers.InvoicesComponent,
    data: {
      title: 'Invoices List - Store App',
      breadcrumbs: [
        {
          text: 'Dashboard',
          link: '/dashboard',
        },
        {
          text: 'Invoice List',
          active: true,
        },
      ],
    } as SBRouteData,
  },
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
  {
    path: 'sell/:invoice_id/:order_id',
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
  {
    path: 'purchase',
    canActivate: [GlobalGuard],
    component: invoicesContainers.PurchaseComponent,
    data: {
      title: 'Purcharse Invoice - Store App',
      breadcrumbs: [
        {
          text: 'Dashboard',
          link: '/dashboard',
        },
        {
          text: 'Purcharse Invoice',
          active: true,
        },
      ],
    } as SBRouteData,
  },
  {
    path: 'chart',
    canActivate: [GlobalGuard],
    component: invoicesContainers.ChartComponent,
    data: {
      title: 'Chart Invoice - Store App',
      breadcrumbs: [
        {
          text: 'Dashboard',
          link: '/dashboard',
        },
        {
          text: 'Chart Invoice',
          active: true,
        },
      ],
    } as SBRouteData,
  },
  {
    path: ':type_id',
    canActivate: [GlobalGuard],
    component: invoicesContainers.InvoicesComponent,
    data: {
      title: 'Invoices List - Store App',
      breadcrumbs: [
        {
          text: 'Dashboard',
          link: '/dashboard',
        },
        {
          text: 'Invoice List',
          active: true,
        },
      ],
    } as SBRouteData,
  },
];

@NgModule({
  imports: [InvoicesModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
