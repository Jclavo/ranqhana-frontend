import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as orderStagesComponents from './components';

/* Containers */ 
import * as orderStagesContainers from './containers';

/* Guards */
// import * as tablesGuards from './guards';

/* Services */
import * as orderStagesServices from './services';

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
    ...orderStagesServices.services,
    // ...tablesGuards.guards,
],
  declarations: [
    ...orderStagesContainers.containers,
    ...orderStagesComponents.components,
  ],
  exports: [...orderStagesContainers.containers, ...orderStagesComponents.components],
})
export class OrderStagesModule { }
