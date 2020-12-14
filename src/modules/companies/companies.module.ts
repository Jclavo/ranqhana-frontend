import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as companiesComponents from './components';

/* Containers */ 
import * as companiesContainers from './containers';

/* Guards */
// import * as tablesGuards from './guards';

/* Services */
import * as companiesServices from './services';

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
    ...companiesServices.services,
],
  declarations: [
    ...companiesContainers.containers,
    ...companiesComponents.components,
  ],
  exports: [...companiesContainers.containers, ...companiesComponents.components],
})
export class CompaniesModule { }
