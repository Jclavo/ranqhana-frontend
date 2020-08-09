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
        path: '',
        canActivate: [GlobalGuard],
        component: itemsContainers.ItemListComponent,
        data: {
            title: 'Items List - Store App',
            breadcrumbs: [
                {
                    text: 'Dashboard ',
                    link: '/dashboard',
                },
                {
                    text: 'Items List',
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
];

@NgModule({
  imports: [ItemsModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
