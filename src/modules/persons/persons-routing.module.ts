import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { PersonsModule } from './persons.module';

/* Containers */
import * as personsContainers from './containers';

/* Guards */
// import * as tablesGuards from './guards';
import { SBRouteData } from '@modules/navigation/models';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: personsContainers.PersonListComponent,
        data: {
            title: 'Persons List - Store App',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Persons List',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    {
        path: 'person',
        // path: 'person/:type_id/:id',
        component: personsContainers.PersonComponent,
        data: {
            title: 'Person  Store App',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Person',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    {
        path: 'person/:id/:universal_person_id',
        component: personsContainers.PersonComponent,
        data: {
            title: 'Person  Store App',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Person',
                    active: true,
                },
            ],
        } as SBRouteData,
    }
];

@NgModule({
    imports: [PersonsModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class PersonsRoutingModule { }
