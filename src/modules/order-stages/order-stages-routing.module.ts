import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { OrderStagesModule } from './order-stages.module';

/* Containers */
import * as orderStagesContainers from './containers';

/* Guards */
// import * as tablesGuards from './guards';
import { SBRouteData } from '@modules/navigation/models';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: orderStagesContainers.OrderStageListComponent,
        data: {
            title: 'Order Stages List - Store App',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Order Stages',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
];

@NgModule({
  imports: [OrderStagesModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})

export class OrderStagesRoutingModule { }
