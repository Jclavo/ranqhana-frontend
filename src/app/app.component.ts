import { Component, LOCALE_ID, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ChildActivationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { AuthService } from "@modules/auth/services";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'sb-admin-angular';
    constructor(public router: Router,
                private titleService: Title,
                private authService: AuthService,
                @Inject(LOCALE_ID) public localeId: string,            
    )
    {
        this.router.events
            .pipe(filter(event => event instanceof ChildActivationEnd))
            .subscribe(event => {
                let snapshot = (event as ChildActivationEnd).snapshot;
                while (snapshot.firstChild !== null) {
                    snapshot = snapshot.firstChild;
                }

                // this.titleService.setTitle('Store App - ' + this.languageService.getI18n(snapshot.data.title) || 'Store App');
                this.titleService.setTitle('Store App');
            });
    }

}
