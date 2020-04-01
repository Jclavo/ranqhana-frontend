import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { UtilityModule } from '@modules/utility/utility.module';

/* Components */
import * as invoicesComponents from './components';
import * as utilitiesComponents from '@modules/utility/components';

/* Containers */ 
import * as invoicesContainers from './containers';

/* Directives */
import * as invoicesDirectives from './directives';

/* Guards */
// import * as tablesGuards from './guards';

/* Services */
import * as invoicesServices from './services';

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
    ...invoicesServices.services,
    // ...tablesGuards.guards,
    ...invoicesDirectives.directives,
  ],
  declarations: [
    ...invoicesContainers.containers,
    ...invoicesComponents.components,
    ...invoicesDirectives.directives,
  ],
  exports: [...invoicesContainers.containers, ...invoicesComponents.components],
  entryComponents: [ invoicesComponents.AddAditionalInfoComponent, utilitiesComponents.ConfirmModalComponent]
})
export class InvoicesModule { }
