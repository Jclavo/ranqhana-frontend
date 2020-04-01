/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as utilityComponents from './components';

/* Containers */
import * as utilityContainers from './containers';

/* Guards */
import * as utilityGuards from './guards';

/* Services */
import * as utilityServices from './services';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

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
    providers: [...utilityServices.services, ...utilityGuards.guards],
    declarations: [...utilityContainers.containers, ...utilityComponents.components, ConfirmModalComponent],
    exports: [...utilityContainers.containers, ...utilityComponents.components],
})
export class UtilityModule {}
