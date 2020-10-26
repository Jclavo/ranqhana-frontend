import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as invoiceStagesComponents from './components';

/* Containers */ 
import * as invoiceStagesContainers from './containers';

 /* Services */
import * as invoiceStagesServices from './services';

@NgModule({
  imports: [
    CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        AppCommonModule,
        NavigationModule,
  ],
  providers: [
    DecimalPipe,
    ...invoiceStagesServices.services,
],
  declarations: [
    ...invoiceStagesContainers.containers,
    ...invoiceStagesComponents.components,
  ],
  exports: [...invoiceStagesContainers.containers, ...invoiceStagesComponents.components],
})
export class InvoiceStagesModule { }
