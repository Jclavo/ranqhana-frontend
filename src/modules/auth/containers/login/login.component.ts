import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// MODELS
import { User } from '@modules/users/models';
import { Response } from '../../../utility/models/index';

// SERVICE
import { UtilityService, NotificationService } from '../../../utility/services';
import { AuthService } from '../../services';
import { UserService } from '@modules/users/services';

//UTILS
import { FormUtils, CustomValidator } from "@modules/utility/utils";


@Component({
  selector: 'sb-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {

  public errorsList: Array<string> = [];

  public user = new User;

  loginForm: FormGroup = this.fb.group({
    login: ['', [Validators.required, Validators.maxLength(15), CustomValidator.validatePositiveNumbers]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(45)]]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private utilityService: UtilityService,
    private notificationService: NotificationService,
    private userService: UserService,
    private authService: AuthService,
  ) {
    this.authService.cleanStorage();
  }

  ngOnInit() { }

  login() {

    if (this.loginForm.invalid) {
      this.errorsList = this.utilityService.getFormError(this.loginForm);
      this.notificationService.error(this.errorsList[0]);
      return;
    }

    this.user = FormUtils.moveFormValuesToModel(this.loginForm.value, this.user);

    this.userService.login(this.user).subscribe((response: Response) => {

      if (response.status) {
        // console.log('user', response.result);
        this.authService.setUser(response.result);
        this.notificationService.success(response.message);
        this.router.navigate(['/dashboard']);
      }
      else {
        this.notificationService.error(response.message);
      }

    }, (error: any) => {
      this.notificationService.error(error);
    });
  }
}
