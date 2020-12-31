import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { sideNavItems, sideNavSections } from '@modules/navigation/data';
import { NavigationService } from '@modules/navigation/services';
import { Subscription } from 'rxjs';

//MODELS
import { Module } from '@modules/modules/models';

//SERVICES
import { ModuleService } from '@modules/modules/services';
import { AuthService } from "@modules/auth/services";
import { NotificationService } from '@modules/utility/services';

@Component({
    selector: 'sb-layout-dashboard',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './layout-dashboard.component.html',
    styleUrls: ['layout-dashboard.component.scss'],
})
export class LayoutDashboardComponent implements OnInit, OnDestroy {
    @Input() static = false;
    @Input() light = false;
    @HostBinding('class.sb-sidenav-toggled') sideNavHidden = false;
    subscription: Subscription = new Subscription();
    // sideNavItems = sideNavItems;
    sideNavItems: Array<Module> = [];
    sideNavSections = sideNavSections;
    sidenavStyle = 'sb-sidenav-dark';

    constructor(
        public navigationService: NavigationService,
        private changeDetectorRef: ChangeDetectorRef,
        public authService: AuthService,
        private notificationService: NotificationService,
        private moduleService: ModuleService
    ) {
        this.getItems();
    }
    ngOnInit() {
        if (this.light) {
            this.sidenavStyle = 'sb-sidenav-light';
        }
        this.subscription.add(
            this.navigationService.sideNavVisible$().subscribe(isVisible => {
                this.sideNavHidden = !isVisible;
                this.changeDetectorRef.markForCheck();
            })
        );
        
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getItems() {

        this.moduleService.getMenu().subscribe(response => {

            if (response.status) {

                //Filter only taapaq menu
                this.sideNavItems =  response.result?.filter(function(module: Module) {
                    return !module.name?.toLowerCase().includes("taapaq".toLowerCase());
                });

                if(this.sideNavItems.length == 0){
                    this.notificationService.error('Your user does not have any permissions.');
                    this.authService.raiseError();
                }

                // Add HOME to the menu
                let moduleHome = new Module();
                moduleHome.id = 0;
                moduleHome.icon = 'home';
                moduleHome.name = 'Home';
                moduleHome.url = '/home';
                this.sideNavItems.unshift(moduleHome);
                
            }
            else {
                this.notificationService.error('Your user does not have any permissions.');
            }

        }, error => {
            this.notificationService.error(error);
            this.authService.raiseError();
        });
    }
}
