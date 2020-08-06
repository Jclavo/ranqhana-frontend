import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { ServicesModule } from './services.module';

/* Containers */
import * as servicesContainers from './containers';

/* Guards */
// import * as tablesGuards from './guards';
import { SBRouteData } from '@modules/navigation/models';

/* Routes */
export const ROUTES: Routes = [
  {
      path: '',
      canActivate: [],
      component: servicesContainers.ServiceListComponent,
      data: {
          title: 'Serivices List - Store App',
          breadcrumbs: [
              {
                  text: 'Dashboard',
                  link: '/dashboard',
              },
              {
                  text: 'Serivice',
                  active: true,
              },
          ],
      } as SBRouteData,
  },
];

@NgModule({
  imports: [ServicesModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
