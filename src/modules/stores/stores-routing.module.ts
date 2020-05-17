import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { StoresModule } from './stores.module';

/* Containers */
import * as usersContainers from './containers';

/* Guards */
import { GlobalGuard } from '@modules/utility/guards';
 
export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [GlobalGuard],
    component: usersContainers.StoreListComponent,
    data: {
      title: 'Stores List - Store App',
      breadcrumbs: [
        {
          text: 'Dashboard',
          link: '/dashboard',
        },
        {
          text: 'Stores List',
          active: true,
        },
      ],
    } as SBRouteData,
  },
  // {
  //   path: 'user',
  //   canActivate: [GlobalGuard],
  //   component: usersContainers.UserComponent,
  //   data: {
  //     title: 'Users  Store App',
  //     breadcrumbs: [
  //       {
  //         text: 'Dashboard',
  //         link: '/dashboard',
  //       },
  //       {
  //         text: 'User',
  //         active: true,
  //       },
  //     ],
  //   } as SBRouteData,
  // },
];

@NgModule({
  imports: [StoresModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class StoresRoutingModule { }
