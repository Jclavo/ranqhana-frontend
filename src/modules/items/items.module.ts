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
import * as itemsComponents from './components';
import * as utilityComponents from '@modules/utility/components';

/* Containers */
import * as itemsContainers from './containers';

/* Services */
import * as itemsServices from './services';

// Import ngx-barcode module
import { NgxBarcodeModule } from 'ngx-barcode';

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
    NgxBarcodeModule.forRoot()
  ],
  providers: [
    DecimalPipe,
    ...itemsServices.services,
  ],
  declarations: [
    ...itemsContainers.containers,
    ...itemsComponents.components,
  ],
  exports: [
    ...itemsContainers.containers, 
    ...itemsComponents.components
  ],
  entryComponents: [
    utilityComponents.ConfirmModalComponent,
    utilityComponents.ImageModalComponent
  ]
})
export class ItemsModule { }
