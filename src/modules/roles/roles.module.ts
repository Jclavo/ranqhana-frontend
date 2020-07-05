import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { UtilityModule } from '@modules/utility/utility.module';

/* Components */
import * as rolesComponents from './components';

/* Containers */
import * as rolesContainers from './containers';

/* Services */
import * as rolesServices from './services';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppCommonModule,
    NavigationModule,
    UtilityModule,
  ],
  providers: [
    ...rolesServices.services,
  ],
  declarations: [
    ...rolesContainers.containers,
    ...rolesComponents.components,
  ],
  exports: [
    ...rolesContainers.containers,
    ...rolesComponents.components
  ]
})
export class RolesModule { }
