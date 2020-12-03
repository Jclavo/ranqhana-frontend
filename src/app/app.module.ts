import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from '@modules/auth/auth.module';


import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Modules */
import { UtilityModule } from '@modules/utility/utility.module';

declare module "@angular/core" {
  interface ModuleWithProviders<T = any> {
    ngModule: Type<T>;
    providers?: Provider[];
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
    AuthModule,
    UtilityModule
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
