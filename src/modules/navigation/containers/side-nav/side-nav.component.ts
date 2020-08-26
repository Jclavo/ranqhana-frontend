import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';

import { SideNavItems, SideNavSection } from '@modules/navigation/models';
import { NavigationService } from '@modules/navigation/services';
import { Subscription } from 'rxjs';

//SERVICES
import { AuthService } from "@modules/auth/services";

@Component({
    selector: 'sb-side-nav',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './side-nav.component.html',
    styleUrls: ['side-nav.component.scss'],
})
export class SideNavComponent implements OnInit, OnDestroy {
    @Input() sidenavStyle!: string;
    @Input() sideNavItems!: SideNavItems;
    @Input() sideNavSections!: SideNavSection[];

    subscription: Subscription = new Subscription();
    routeDataSubscription!: Subscription;

    constructor(
        public navigationService: NavigationService,
        public authService: AuthService
    ) {

        console.log('this.authService.getUserEmail()', this.authService.getUserEmail());
    }

    ngOnInit() {}

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }


}
