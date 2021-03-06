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
import * as unitsComponents from './components';
import * as utilityComponents from '@modules/utility/components';

/* Containers */
import * as unitsContainers from './containers';

/* Services */
import * as unitsServices from './services';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppCommonModule,
    NavigationModule,
    UtilityModule
  ],
  providers: [
    DecimalPipe,
    ...unitsServices.services
  ],
  declarations: [
    ...unitsComponents.components,
    ...unitsContainers.containers,
  ],
  exports: [
    ...unitsComponents.components,
    ...unitsContainers.containers
  ],
  entryComponents: [
    unitsComponents.UnitModalComponent,
    utilityComponents.ConfirmModalComponent
  ]

})
export class UnitsModule { }
