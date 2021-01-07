import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { PricesModule } from './prices.module';

/* Containers */
import * as pricesContainers from './containers';

/* Guards */
// import * as tablesGuards from './guards';
import { SBRouteData } from '@modules/navigation/models';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: pricesContainers.PriceListComponent,
        data: {
            title: 'Prices List - Store App',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Price',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
];

@NgModule({
  imports: [PricesModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class PricesRoutingModule { }
