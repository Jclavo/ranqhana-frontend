import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
import * as invoicesServices from './services';
import { NgBootstrapTableInvoicesComponent } from './components/ng-bootstrap-table-invoices/ng-bootstrap-table-invoices.component';

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
    ...invoicesServices.services,
    // ...tablesGuards.guards,
    ...invoicesDirectives.directives,
  ],
  declarations: [
    ...invoicesContainers.containers,
    ...invoicesComponents.components,
    ...invoicesDirectives.directives,
    NgBootstrapTableInvoicesComponent,
  ],
  exports: [...invoicesContainers.containers, ...invoicesComponents.components],
  entryComponents: [ invoicesComponents.AddAditionalInfoComponent]
})
export class InvoicesModule { }
