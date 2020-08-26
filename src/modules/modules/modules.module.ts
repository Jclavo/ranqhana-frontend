import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as modulesComponents from './components';

/* Containers */ 
import * as modulesContainers from './containers';


/* Guards */
// import * as tablesGuards from './guards';

/* Services */
import * as modulesServices from './services';


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
    ...modulesServices.services,
    // ...tablesGuards.guards,
],
  declarations: [
    ...modulesContainers.containers,
    ...modulesComponents.components,
  ],
  exports: [...modulesContainers.containers, ...modulesComponents.components],
})
export class ModulesModule { }
