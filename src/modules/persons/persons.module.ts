import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { UtilityModule } from '@modules/utility/utility.module';

/* Components */
import * as personsComponents from './components';
import * as utilitiesComponents from '@modules/utility/components';

/* Containers */ 
import * as personsContainers from './containers';

/* Guards */
// import * as tablesGuards from './guards';

/* Services */
import * as personsServices from './services';

import { NgxMaskModule } from 'ngx-mask'; 

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
        NgxMaskModule.forRoot(),
  ],
  providers: [
    DecimalPipe,
    ...personsServices.services,
],
  declarations: [
    ...personsContainers.containers,
    ...personsComponents.components,
  ],
  exports: [
    ...personsContainers.containers, 
    ...personsComponents.components
  ],
  entryComponents: [
    utilitiesComponents.ConfirmModalComponent,
    utilitiesComponents.ImageModalComponent
  ]
})
export class PersonsModule { }
