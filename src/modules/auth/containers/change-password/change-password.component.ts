import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// MODELS
import { Password } from '@modules/users/models';
import { Response, FormMessage } from '@modules/utility/models';

// SERVICE
import { UtilityService, NotificationService, LanguageService } from '../../../utility/services';
import { UserService } from '@modules/users/services';

//UTILS
import { FormUtils, CustomValidator } from "@modules/utility/utils";

@Component({
  selector: 'sb-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public errorsList: Array<FormMessage> = [];

  private changePassword = new Password();

  changePasswordForm: FormGroup = this.fb.group({
    api_token: ['', [Validators.required, Validators.minLength(80), Validators.maxLength(80)]],
    actualPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(45)]],
    newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(45)]],
    reNewPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(45)]],
  },
    {
      validator: CustomValidator.mustMatch('newPassword', 'reNewPassword')
    }
  );

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private utilityService: UtilityService,
    private notificationService: NotificationService,
    private userService: UserService,
    private languageService: LanguageService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    FormUtils.setFormValue(this.changePasswordForm, 'api_token', this.activatedRoute.snapshot.paramMap.get('api_token'));
  }

  change() {

    if (this.changePasswordForm.invalid) {
      this.errorsList = this.utilityService.getFormError(this.changePasswordForm);
      if (this.errorsList.length > 0) {
        this.errorsList[0].setKey(this.languageService.getI18n('user.field.' + this.errorsList[0].getKey()));
        this.notificationService.error(this.errorsList[0].getMessage());
      }

      return;
    }

    this.changePassword = FormUtils.moveFormValuesToModel(this.changePasswordForm.value, this.changePassword);

    this.userService.changePassword(this.changePassword).subscribe((response: Response) => {

      if (response.status) {
        this.notificationService.success(response.message);
        this.router.navigate(['/']);
      }
      else {
        this.notificationService.error(response.message);
      }

    }, (error: any) => {
      this.notificationService.error(error);
    });
  }
}
