import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as paymentsComponents from './components';

/* Containers */
import * as paymentsContainers from './containers';

/* Guards */
// import * as tablesGuards from './guards';

/* Services */
import * as paymentsServices from './services';

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
    ...paymentsServices.services,
    // ...tablesGuards.guards,
  ],
  declarations: [
    ...paymentsContainers.containers,
    ...paymentsComponents.components,

  ],
  exports: [...paymentsContainers.containers, ...paymentsComponents.components],
  entryComponents: [
    paymentsComponents.MadePaymentModalComponent,
  ]
})
export class PaymentsModule { }
