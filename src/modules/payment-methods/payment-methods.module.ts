import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as paymentMethodsComponents from './components';

/* Containers */ 
import * as paymentMethodsContainers from './containers';

/* Guards */
// import * as tablesGuards from './guards';

/* Services */
import * as paymentMethodsServices from './services';

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
    ...paymentMethodsServices.services,
    // ...tablesGuards.guards,
],
  declarations: [
    ...paymentMethodsContainers.containers,
    ...paymentMethodsComponents.components,
  ],
  exports: [...paymentMethodsContainers.containers, ...paymentMethodsComponents.components],
})

export class PaymentMethodsModule { }
