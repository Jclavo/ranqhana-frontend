import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from '@modules/users/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// COMPONENT 
import { ChangeLanguageModalComponent } from "@modules/languages/components";

@Component({
    selector: 'sb-top-nav-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit {
    constructor(
        public userService: UserService,
        public ngbModal: NgbModal
    ) { }
    ngOnInit() { }

    openLanguageModal() {
        const modalRef = this.ngbModal.open(ChangeLanguageModalComponent, { centered: true, backdrop: 'static' });
    }
}
