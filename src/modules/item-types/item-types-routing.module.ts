import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { ItemTypesModule } from './item-types.module';

/* Containers */
import * as itemTypesContainers from './containers';

/* Guards */
// import * as tablesGuards from './guards';
import { SBRouteData } from '@modules/navigation/models';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: itemTypesContainers.ItemTypeListComponent,
        data: {
            title: 'Item Types List - Store App',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Item Types',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
];

@NgModule({
  imports: [ItemTypesModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ItemTypesRoutingModule { }
