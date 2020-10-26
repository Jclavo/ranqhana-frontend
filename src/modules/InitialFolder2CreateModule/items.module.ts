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

/* Directives */
import * as itemsDirectives from './directives';

/* Guards */
// import * as tablesGuards from './guards';

/* Services */
import * as itemsServices from './services';
import { NgBootstrapTableItemsComponent } from './components/ng-bootstrap-table-items/ng-bootstrap-table-items.component';

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
    // ...tablesGuards.guards,
     ...itemsDirectives.directives,
],
  declarations: [
    ...itemsContainers.containers,
    ...itemsComponents.components,
    ...itemsDirectives.directives,
    NgBootstrapTableItemsComponent,
  ],
  exports: [...itemsContainers.containers, ...itemsComponents.components],
})
export class ItemsModule { }
