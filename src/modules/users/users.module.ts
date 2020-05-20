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
import * as usersComponents from './components';
import * as utilitiesComponents from '@modules/utility/components';

/* Containers */
import * as usersContainers from './containers';

/* Services */
import * as usersServices from './services';

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
    ...usersServices.services,
  ],
  declarations: [
    ...usersContainers.containers,
    ...usersComponents.components,
  ],
  exports: [
    ...usersContainers.containers,
    ...usersComponents.components
  ],
  entryComponents: [
    utilitiesComponents.ConfirmModalComponent
  ]
})
export class UsersModule { }
