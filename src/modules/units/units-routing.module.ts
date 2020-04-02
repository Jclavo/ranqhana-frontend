import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { UnitsModule } from './units.module';

/* Routes */
export const ROUTES: Routes = [
  {
      // path: '',
      // canActivate: [],
      // component: itemsContainers.ItemListComponent,
      // data: {
      //     title: 'Items List - Store App',
      //     breadcrumbs: [
      //         {
      //             text: 'Dashboard',
      //             link: '/dashboard',
      //         },
      //         {
      //             text: 'Item',
      //             active: true,
      //         },
      //     ],
      // } as SBRouteData,
  },
];

@NgModule({
  imports: [UnitsModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class UnitsRoutingModule { } 
