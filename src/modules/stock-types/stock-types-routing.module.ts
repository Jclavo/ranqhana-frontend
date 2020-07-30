import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { ItemsModule } from './stock-types.module';

/* Containers */
import * as stockTypesContainers from './containers';

/* Guards */
// import * as tablesGuards from './guards';
import { SBRouteData } from '@modules/navigation/models';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: stockTypesContainers.StockTypeListComponent,
        data: {
            title: 'Stock Types List - Store App',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Stock Type',
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
