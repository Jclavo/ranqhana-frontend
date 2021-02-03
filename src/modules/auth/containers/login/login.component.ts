import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// MODELS
import { User } from '@modules/users/models';
import { Response, FormMessage } from '@modules/utility/models';

// SERVICE
import { UtilityService, NotificationService, LanguageService } from '../../../utility/services';
import { AuthService } from '../../services';
import { UserService } from '@modules/users/services';

// COMPONENT 
import { ChangeLanguageModalComponent } from "@modules/languages/components";

//UTILS
import { FormUtils, CustomValidator } from "@modules/utility/utils";


@Component({
  selector: 'sb-login',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {

  public errorsList: Array<FormMessage> = [];

  public user = new User;

  loginForm: FormGroup = this.fb.group({
    login: ['', [Validators.required, Validators.maxLength(15), CustomValidator.validateStringPositiveNumbers]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(45)]],
    language: ['']
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private utilityService: UtilityService,
    private notificationService: NotificationService,
    private userService: UserService,
    private authService: AuthService,
    private languageService: LanguageService,
    private ngbModal: NgbModal,
  ) {
    this.authService.cleanStorage();
  }

  ngOnInit() { }

  login() {
    if (this.loginForm.invalid) {
      this.errorsList = this.utilityService.getFormError(this.loginForm);
      if (this.errorsList.length > 0) {
        this.errorsList[0].setKey(this.languageService.getI18n('login.' + this.errorsList[0].getKey()));
        this.notificationService.error(this.errorsList[0].getMessage());
      }

      return;
    }

    this.user = FormUtils.moveFormValuesToModel(this.loginForm.value, this.user);

    this.userService.login(this.user).subscribe((response: Response) => {

      if (response.status) {
        this.authService.setUser(response.result);
        this.notificationService.success(response.message);
        
        if(response.result?.hasInitialPassword){
          this.router.navigate(['/change-password', this.authService.getAPITOKEN()]);
        }else{
          this.router.navigate(['/home']);
        }
      }
      else {
        this.notificationService.error(response.message);
      }

    }, (error: any) => {
      this.notificationService.error(error);
    });
  }

  openLanguageModal(){

    const modalRef = this.ngbModal.open(ChangeLanguageModalComponent, { centered: true, backdrop: 'static' });

  }

}
