import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as paymentStagesComponents from './components';

/* Containers */ 
import * as paymentStagesContainers from './containers';

/* Guards */
// import * as tablesGuards from './guards';

/* Services */
import * as paymentStagesServices from './services';


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
    ...paymentStagesServices.services,
],
  declarations: [
    ...paymentStagesContainers.containers,
    ...paymentStagesComponents.components,
  ],
  exports: [...paymentStagesContainers.containers, ...paymentStagesComponents.components],
})
export class PaymentStagesModule { }
