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
import * as storesComponents from './components';
// import * as utilitiesComponents from '@modules/utility/components';

/* Containers */
import * as storesContainers from './containers';

/* Services */
import * as storesServices from './services';


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
    ...storesServices.services,
  ],
  declarations: [
    ...storesContainers.containers,
    ...storesComponents.components,
  ],
  exports: [
    ...storesContainers.containers,
    ...storesComponents.components
  ],
})
export class StoresModule { }
