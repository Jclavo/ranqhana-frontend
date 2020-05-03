/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as utilityComponents from './components';

/* Containers */
import * as utilityContainers from './containers';

/* Guards */
import * as utilityGuards from './guards';

/* Directives */
import * as utilityDirectives from './directives';

/* Directives */
import * as utilityUtils from './utils';

/* Services */
import * as utilityServices from './services';

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
        ...utilityServices.services, 
        ...utilityGuards.guards,
        ...utilityDirectives.directives,
        ...utilityUtils.utils,
        { provide: NgbDateAdapter, useClass: utilityServices.CustomAdapterService},
        { provide: NgbDateParserFormatter, useClass: utilityServices.CustomDateParserFormatterService}
    ],
    declarations: [
        ...utilityContainers.containers, 
        ...utilityComponents.components,
        ...utilityDirectives.directives,
        // ...utilityUtils.utils,
    ],
    exports: [
        ...utilityContainers.containers, 
        ...utilityComponents.components,
        ...utilityDirectives.directives,
        // ...utilityUtils.utils,
    ],
})
export class UtilityModule {}
