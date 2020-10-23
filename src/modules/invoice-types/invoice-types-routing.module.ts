import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { InvoiceTypesModule } from './invoice-types.module';

/* Containers */
import * as invoiceTypesContainers from './containers';

/* Guards */
// import * as tablesGuards from './guards';
import { SBRouteData } from '@modules/navigation/models';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: invoiceTypesContainers.ItemListComponent,
        data: {
            title: 'Invoice Types List - Store App',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Invoice Type',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
];

@NgModule({
  imports: [InvoiceTypesModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class InvoiceTypesRoutingModule { }
