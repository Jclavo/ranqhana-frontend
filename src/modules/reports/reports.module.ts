import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { ChartsModule } from '@modules/charts/charts.module';

/* Components */
import * as reportsComponents from './components';

/* Containers */ 
import * as reportsContainers from './containers';


/* Guards */
// import * as tablesGuards from './guards';

/* Services */
import * as reportsServices from './services';

@NgModule({
  imports: [
    CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        AppCommonModule,
        NavigationModule,
        ChartsModule
  ],
  providers: [
    DecimalPipe,
    ...reportsServices.services,
],
  declarations: [
    ...reportsContainers.containers,
    ...reportsComponents.components,
  ],
  exports: [...reportsContainers.containers, ...reportsComponents.components],
})
export class ReportsModule { }
