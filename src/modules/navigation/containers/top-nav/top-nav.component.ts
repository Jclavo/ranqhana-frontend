import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

//Services
import { NavigationService } from '@modules/navigation/services';
import { AuthService } from '@modules/auth/services';

@Component({
    selector: 'sb-top-nav',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav.component.html',
    styleUrls: ['top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
    constructor(
        private navigationService: NavigationService,
        public authService: AuthService
    ) {}

    ngOnInit() {}
    toggleSideNav() {
        this.navigationService.toggleSideNav();
    }


}
