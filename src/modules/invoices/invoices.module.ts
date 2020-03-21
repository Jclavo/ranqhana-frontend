import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SellComponent } from './containers/sell/sell.component';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as invoicesComponents from './components';

/* Containers */ 
import * as invoicesContainers from './containers';

/* Directives */
import * as invoicesDirectives from './directives';


/* Guards */
// import * as tablesGuards from './guards';

/* Services */
// import * as invoicesServices from './services';

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
    // ...itemsServices.services,
    // ...tablesGuards.guards,
    ...invoicesDirectives.directives,
  ],
  declarations: [
    ...invoicesContainers.containers,
    ...invoicesComponents.components,
    ...invoicesDirectives.directives,
  ],
  exports: [...invoicesContainers.containers, ...invoicesComponents.components],
})
export class InvoicesModule { }
