import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { RolesModule } from './roles.module';

/* Containers */
import * as rolesContainers from './containers';

/* Guards */
import { GlobalGuard } from '@modules/utility/guards';


export const ROUTES: Routes = [];

@NgModule({
  imports: [RolesModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
