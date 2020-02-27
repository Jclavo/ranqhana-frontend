import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule,
              AppRoutingModule,
              BrowserAnimationsModule,
              ToastrModule.forRoot() // ToastrModule added
            ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
