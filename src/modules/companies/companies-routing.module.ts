import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { CompaniesModule } from './companies.module';

/* Containers */
import * as companiesContainers from './containers';

/* Guards */
// import * as tablesGuards from './guards';
import { SBRouteData } from '@modules/navigation/models';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: companiesContainers.CompanyListComponent,
        data: {
            title: 'Companies List - Store App',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Company',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
];

@NgModule({
  imports: [CompaniesModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }
