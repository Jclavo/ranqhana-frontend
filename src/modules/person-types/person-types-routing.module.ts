import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { PersonTypesModule } from './person-types.module';

/* Containers */
import * as personTypesContainers from './containers';

/* Guards */
// import * as tablesGuards from './guards';
import { SBRouteData } from '@modules/navigation/models';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: personTypesContainers.PersonTypeListComponent,
        data: {
            title: 'Person Types List - Store App',
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
];

@NgModule({
  imports: [PersonTypesModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class PersonTypesRoutingModule { }
