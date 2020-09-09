import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { LanguagesModule } from './languages.module';

/* Containers */
import * as languagesContainers from './containers';

/* Guards */
import { GlobalGuard } from '@modules/utility/guards';

/* Routes */
export const ROUTES: Routes = [
  {
    // path: '',
    // canActivate: [GlobalGuard],
    // component: languagesContainers.,
    // data: {
    //     title: 'Units List - Store App',
    //     breadcrumbs: [
    //         {
    //             text: 'Dashboard ',
    //             link: '/dashboard',
    //         },
    //         {
    //             text: 'Units List',
    //             active: true,
    //         }
    //     ],
    // } as SBRouteData,
  },
];

@NgModule({
  imports: [LanguagesModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class LanguagesRoutingModule { }
