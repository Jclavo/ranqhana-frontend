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
  {
    path: '',
    canActivate: [GlobalGuard],
    component: usersContainers.UserListComponent,
    data: {
      title: 'Invoices List - Store App',
      breadcrumbs: [
        {
          text: 'Dashboard',
          link: '/dashboard',
        },
        {
          text: 'Invoice List',
          active: true,
        },
      ],
    } as SBRouteData,
  },
];

@NgModule({
  imports: [UsersModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
