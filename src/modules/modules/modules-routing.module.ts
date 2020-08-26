import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { ModulesModule } from './modules.module';

/* Containers */
import * as modulesContainers from './containers';

/* Guards */
// import * as tablesGuards from './guards';
import { SBRouteData } from '@modules/navigation/models';

/* Routes */
export const ROUTES: Routes = [
  {
      path: '',
      canActivate: [],
      component: modulesContainers.ModuleListComponent,
      data: {
          title: 'Modules List - Store App',
          breadcrumbs: [
              {
                  text: 'Dashboard',
                  link: '/dashboard',
              },
              {
                  text: 'Module',
                  active: true,
              },
          ],
      } as SBRouteData,
  },
];

@NgModule({
imports: [ModulesModule, RouterModule.forChild(ROUTES)],
exports: [RouterModule]
})

export class ModulesRoutingModule { }
