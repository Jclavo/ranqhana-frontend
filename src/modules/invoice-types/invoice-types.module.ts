import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as invoiceTypesComponents from './components';

/* Containers */ 
import * as invoiceTypesContainers from './containers';

/* Guards */
// import * as tablesGuards from './guards';

/* Services */
import * as invoiceTypesServices from './services';

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
    ...invoiceTypesServices.services,
    // ...tablesGuards.guards,
],
  declarations: [
    ...invoiceTypesContainers.containers,
    ...invoiceTypesComponents.components,
  ],
  exports: [...invoiceTypesContainers.containers, ...invoiceTypesComponents.components],
})
export class InvoiceTypesModule { }
