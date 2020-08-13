import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { ItemsModule } from './items.module';

/* Containers */
import * as itemsContainers from './containers';

/* Guards */
import { GlobalGuard } from '@modules/utility/guards';

import { SBRouteData } from '@modules/navigation/models';

/* Routes */
export const ROUTES: Routes = [
    {
        path: 'products',
        canActivate: [GlobalGuard],
        component: itemsContainers.ProductListComponent,
        data: {
            title: 'Product List - Store App',
            breadcrumbs: [
                {
                    text: 'Dashboard ',
                    link: '/dashboard',
                },
                {
                    text: 'Product List',
                    active: true,
                }
            ],
        } as SBRouteData,
    },
    {
        path: 'product',
        canActivate: [GlobalGuard],
        component: itemsContainers.ProductComponent,
        data: {
            title: 'Product - Store App',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Product',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    {
        path: 'product/:id',
        canActivate: [GlobalGuard],
        component: itemsContainers.ProductComponent,
        data: {
            title: 'Edit Product - Store App',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Product Item',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    {
        path: 'services',
        canActivate: [GlobalGuard],
        component: itemsContainers.ServiceListComponent,
        data: {
            title: 'Service List - Store App',
            breadcrumbs: [
                {
                    text: 'Dashboard ',
                    link: '/dashboard',
                },
                {
                    text: 'Service List',
                    active: true,
                }
            ],
        } as SBRouteData,
    },
    {
        path: 'service',
        canActivate: [GlobalGuard],
        component: itemsContainers.ServiceComponent,
        data: {
            title: 'Service - Store App',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Service',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    {
        path: 'service/:id',
        canActivate: [GlobalGuard],
        component: itemsContainers.ServiceComponent,
        data: {
            title: 'Edit Service - Store App',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Service Item',
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
export class ItemsRoutingModule { }
