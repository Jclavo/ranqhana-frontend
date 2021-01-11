import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

//MODELS
import { Response } from "@modules/utility/models";
import { User } from "@modules/users/models";

import { UtilityService, NotificationService, LanguageService } from '../../../utility/services';
import { UserService } from '@modules/users/services';
import { AuthService } from '@modules/auth/services';

@Component({
  selector: 'sb-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  public modalResponse = new Response();
  public user = new User();

  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.user.isCustom = true;
  }

  login(){
    this.userService.login(this.user).subscribe((response: Response) => {

      if (response.status) {
        this.modalResponse.status = true;
        this.modalResponse.result = {'api_token' : response.result?.api_token}
        this.activeModal.close(this.modalResponse);
      }
      else {
        this.notificationService.error(response.message);
      }

    }, (error: any) => {
      this.notificationService.error(error);
    });
  }

}
