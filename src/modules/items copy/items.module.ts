import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as itemsComponents from './components';

/* Containers */ 
import * as itemsContainers from './containers';

/* Guards */
// import * as tablesGuards from './guards';

/* Services */
import * as itemsServices from './services';

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
    ...itemsServices.services,
],
  declarations: [
    ...itemsContainers.containers,
    ...itemsComponents.components,
  ],
  exports: [...itemsContainers.containers, ...itemsComponents.components],
})
export class ItemsModule { }
