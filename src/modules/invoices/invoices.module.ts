import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { UtilityModule } from '@modules/utility/utility.module';
import { ChartsModule } from '@modules/charts/charts.module';

/* Components */
import * as invoicesComponents from './components';
import * as utilitiesComponents from '@modules/utility/components';

/* Containers */
import * as invoicesContainers from './containers';

/* Services */
import * as invoicesServices from './services';

/* Utils */
import * as invoicesUtils from './utils';
// import * as UtilityUtils from '@modules/utility/utils';

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
    ChartsModule
  ],
  providers: [
    ...invoicesServices.services,
    ...invoicesUtils.utils,
   ],
  declarations: [
    ...invoicesContainers.containers,
    ...invoicesComponents.components,
  ],
  exports: [
    ...invoicesContainers.containers,
    ...invoicesComponents.components
  ],
  entryComponents: [
    invoicesComponents.AddAditionalInfoComponent,
    invoicesComponents.ShowInvoiceComponent,
    utilitiesComponents.ConfirmModalComponent,
  ]
})
export class InvoicesModule { }
