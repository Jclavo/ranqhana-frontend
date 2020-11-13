import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as personTypesComponents from './components';

/* Containers */ 
import * as personTypesContainers from './containers';

/* Guards */
// import * as tablesGuards from './guards';

/* Services */
import * as personTypesServices from './services';

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
    ...personTypesServices.services,
],
  declarations: [
    ...personTypesContainers.containers,
    ...personTypesComponents.components,
  ],
  exports: [...personTypesContainers.containers, ...personTypesComponents.components],
})

export class PersonTypesModule { }
