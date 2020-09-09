import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as languagesComponents from './components';

/* Containers */
import * as languagesContainers from './containers';

/* Services */
import * as languagesServices from './services';
 

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
    ...languagesServices.services
  ],
  declarations: [
    ...languagesComponents.components,
    ...languagesContainers.containers,
  ],
  exports: [
    ...languagesComponents.components,
    ...languagesContainers.containers
  ],
  entryComponents: [
  ]

})
export class LanguagesModule { }
