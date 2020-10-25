import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { UtilityModule } from '@modules/utility/utility.module';
import { InvoicesModule } from '@modules/invoices/invoices.module';

/* Components */
import * as ordersComponents from './components';
import * as utilityComponents from '@modules/utility/components';

/* Containers */
import * as ordersContainers from './containers';

/* Guards */
// import * as tablesGuards from './guards';

/* Services */
import * as ordersServices from './services';

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
    InvoicesModule
  ],
  providers: [
    DecimalPipe,
    ...ordersServices.services,
    // ...tablesGuards.guards,
  ],
  declarations: [
    ...ordersContainers.containers,
    ...ordersComponents.components,
  ],
  exports: [
    ...ordersContainers.containers, 
    ...ordersComponents.components
  ],
  entryComponents: [
    utilityComponents.ConfirmModalComponent,
    utilityComponents.ImageModalComponent,
    utilityComponents.ChangeStageModalComponent,
    utilityComponents.ChangeDateModalComponent
  ]
})
export class OrdersModule { }
