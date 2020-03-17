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
        path: 'item',
        canActivate: [GlobalGuard],
        component: itemsContainers.ItemComponent,
        data: {
            title: 'Item - Store App',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Item',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    {
        path: 'item/:id',
        canActivate: [GlobalGuard],
        component: itemsContainers.ItemComponent,
        data: {
            title: 'Edit Item - Store App',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Edit Item',
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
