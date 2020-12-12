import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { UsersModule } from './users.module';

/* Containers */
import * as usersContainers from './containers';

/* Guards */
import { GlobalGuard } from '@modules/utility/guards';


/* Routes */
export const ROUTES: Routes = [
  // {
  //   path: '',
  //   canActivate: [GlobalGuard],
  //   component: usersContainers.UserListComponent,
  //   data: {
  //     title: 'user.pageList.title',
  //     // breadcrumbs: [
  //     //   {
  //     //     text: 'Dashboard',
  //     //     link: '/dashboard',
  //     //   },
  //     //   {
  //     //     text: 'Users List',
  //     //     active: true,
  //     //   },
  //     // ],
  //   } as SBRouteData,
  // },
  {
    path: '',
    canActivate: [GlobalGuard],
    component: usersContainers.UserListComponent,
    data: {
      title: 'My Users',
      breadcrumbs: [
        {
          text: 'Dashboard',
          link: '/dashboard',
        },
        {
          text: 'My User',
          active: true,
        },
      ],
    } as SBRouteData,
  },
  // {
  //   path: 'companies',
  //   canActivate: [GlobalGuard],
  //   component: usersContainers.UserListComponent,
  //   data: {
  //     title: 'Companies Store App',
  //     breadcrumbs: [
  //       {
  //         text: 'Dashboard',
  //         link: '/dashboard',
  //       },
  //       {
  //         text: 'Companies',
  //         active: true,
  //       },
  //     ],
  //   } as SBRouteData,
  // },
  // {
  //   path: 'person',
  //   canActivate: [GlobalGuard],
  //   component: usersContainers.UserComponent,
  //   data: {
  //     title: 'Person  Store App',
  //     breadcrumbs: [
  //       {
  //         text: 'Dashboard',
  //         link: '/dashboard',
  //       },
  //       {
  //         text: 'Person',
  //         active: true,
  //       },
  //     ],
  //   } as SBRouteData,
  // },
  // {
  //   path: 'person/:type_id/:id',
  //   canActivate: [GlobalGuard],
  //   component: usersContainers.UserComponent,
  //   data: {
  //     title: 'Person  Store App',
  //     breadcrumbs: [
  //       {
  //         text: 'Dashboard',
  //         link: '/dashboard',
  //       },
  //       {
  //         text: 'Person',
  //         active: true,
  //       },
  //     ],
  //   } as SBRouteData,
  // },
];

@NgModule({
  imports: [UsersModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
