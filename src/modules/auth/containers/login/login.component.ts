import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// MODELS
import { User } from '../../models/user.model';
import { Country } from '../../../country/models';
import { Response } from '../../../utility/models/index';

// SERVICE
import { UtilityService, NotificationService } from '../../../utility/services';
import { UserService, AuthService } from '../../services';
import { CountryService } from '../../../country/services';


@Component({
  selector: 'sb-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {

  public countries: Array<Country> = [];

  public errorsList: Array<string> = [];

  public userLogin = new User;

  loginForm: FormGroup = this.fb.group({
    country_code: ['', [Validators.required]],
    identification: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private utilityService: UtilityService,
    private notificationService: NotificationService,
    private userService: UserService,
    private countryService: CountryService,
    private authService: AuthService,
  ) {
    this.authService.cleanStorage();
    this.getAllCountries();
  }

  ngOnInit() { }

  getAllCountries() {
    this.countryService.getAll().subscribe((response: Response) => {

      if (response.status) {
        this.countries = response.result;
        if(this.countries.length > 0)
          this.loginForm.controls['country_code'].setValue(this.countries[0].code);
      }
    }, error => {
      this.notificationService.error(error);
    });
  }

  getFormValues() {

    let userLogin = new User();

    userLogin.id = this.loginForm.value.id;
    userLogin.country_code = this.loginForm.value.country_code;
    userLogin.identification = this.loginForm.value.identification;
    userLogin.password = this.loginForm.value.password;

    return userLogin;
  }

  login() {

    if (this.loginForm.invalid) {
      this.errorsList = this.utilityService.getFormError(this.loginForm);
      this.notificationService.error(this.errorsList[0]);
      return;
    }

    this.userLogin = this.getFormValues();

    this.userService.login(this.userLogin).subscribe((response: Response) => {

      if (response.status) {
        console.log('user', response.result);
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

// this.countryForm.controls['country'].setValue(this.default, {onlySelf: true});

// WEBS
