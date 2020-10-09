import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as paymentTypesComponents from './components';

/* Containers */ 
import * as paymentTypesContainers from './containers';

/* Guards */
// import * as tablesGuards from './guards';

/* Services */
import * as paymentTypesServices from './services';


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
    ...paymentTypesServices.services,
    // ...tablesGuards.guards,
  ],
  declarations: [
    ...paymentTypesContainers.containers,
    ...paymentTypesComponents.components,
  ],
  exports: [...paymentTypesContainers.containers, ...paymentTypesComponents.components],
})
export class PaymentTypesModule { }
