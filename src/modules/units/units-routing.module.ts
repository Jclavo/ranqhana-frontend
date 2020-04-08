import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { UnitsModule } from './units.module';

/* Containers */
import * as unitsContainers from './containers';

/* Guards */
import { GlobalGuard } from '@modules/utility/guards';

/* Routes */
export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [GlobalGuard],
    component: unitsContainers.UnitListComponent,
    data: {
        title: 'Units List - Store App',
        breadcrumbs: [
            {
                text: 'Dashboard ',
                link: '/dashboard',
            },
            {
                text: 'Units List',
                active: true,
            }
        ],
    } as SBRouteData,
},
];

@NgModule({
  imports: [UnitsModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class UnitsRoutingModule { } 
