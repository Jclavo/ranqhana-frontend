import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// COMPONENT 
import { ChangeLanguageModalComponent } from "@modules/languages/components";

// SERVICES
import { UserService } from '@modules/users/services';
import { AuthService } from "@modules/auth/services";
import { NotificationService} from '@modules/utility/services';

@Component({
    selector: 'sb-top-nav-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit {
    constructor(
        public userService: UserService,
        private ngbModal: NgbModal,
        public authService: AuthService,
        private notificationService: NotificationService
    ) { }
    ngOnInit() { }

    openLanguageModal() {
        const modalRef = this.ngbModal.open(ChangeLanguageModalComponent, { centered: true, backdrop: 'static' });
    }

    logout(){

        this.userService.logout().subscribe(response => {

            if (response.status) {
                this.notificationService.success(response.message);
                this.authService.logout();
            }else{
              this.notificationService.error(response.message);
            }
      
          }, error => {
            this.notificationService.error(error);
            this.authService.raiseError();
          });
    }
}
