import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { OrdersModule } from './orders.module';

/* Containers */
import * as ordersContainers from './containers';
import * as invoicesContainers from '@modules/invoices/containers';

/* Guards */
import { GlobalGuard } from '@modules/utility/guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: ordersContainers.OrderListComponent,
        data: {
            title: 'Orders List - Store App',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Order',
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
          title: 'Purchase Invoice - Store App',
          breadcrumbs: [
            {
              text: 'Dashboard',
              link: '/dashboard',
            },
            {
              text: 'Purchase Invoice',
              active: true,
            },
          ],
        } as SBRouteData,
      },
      {
        path: 'purchase/:invoice_id/:order_id',
        canActivate: [GlobalGuard],
        component: invoicesContainers.PurchaseComponent,
        data: {
          title: 'Purchase Invoice - Store App',
          breadcrumbs: [
            {
              text: 'Dashboard',
              link: '/dashboard',
            },
            {
              text: 'Purchase Invoice',
              active: true,
            },
          ],
        } as SBRouteData,
      },
      {
        path: ':type_id',
        canActivate: [],
        component: ordersContainers.OrderListComponent,
        data: {
            title: 'Orders List - Store App',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Order',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
];

@NgModule({
  imports: [OrdersModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
