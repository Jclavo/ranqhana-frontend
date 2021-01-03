/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask'

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { UtilityModule } from '@modules/utility/utility.module';
import { LanguagesModule } from '@modules/languages/languages.module';

/* Components */
import * as authComponents from './components';

/* Containers */
import * as authContainers from './containers';

/* Guards */
import * as authGuards from './guards';

/* Services */
import * as authServices from './services';
import * as utilityServices from '../utility/services';
import * as countryServices from '../country/services';
import { HomeComponent } from './containers/home/home.component';

@NgModule({
    imports: [ 
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        AppCommonModule,
        NavigationModule,
        NgxMaskModule.forRoot(),
        UtilityModule,
        LanguagesModule
    ],
    providers: [...authServices.services, ...authGuards.guards, utilityServices.UtilityService, countryServices.CountryService],
    declarations: [...authContainers.containers, ...authComponents.components, HomeComponent],
    exports: [...authContainers.containers, ...authComponents.components],
})
export class AuthModule {}
