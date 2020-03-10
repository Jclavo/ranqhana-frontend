import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from '@modules/auth/auth.module';


import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule,
              AppRoutingModule,
              BrowserAnimationsModule,
              ToastrModule.forRoot(), // ToastrModule added
              AuthModule,
            ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
