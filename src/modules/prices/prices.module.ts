import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as pricesComponents from './components';

/* Containers */ 
import * as pricesContainers from './containers';

/* Guards */
// import * as tablesGuards from './guards';

/* Services */
import * as pricesServices from './services';
import { ShowPricesComponent } from './components/show-prices/show-prices.component';

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
    ...pricesServices.services,
],
  declarations: [
    ...pricesContainers.containers,
    ...pricesComponents.components,
    ShowPricesComponent,
  ],
  exports: [...pricesContainers.containers, ...pricesComponents.components],
})
export class PricesModule { }
