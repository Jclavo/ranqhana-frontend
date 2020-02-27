import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


// MODELS
import { User } from '../../models/user.model';
import { Country } from '../../../country/models';
import { Response } from '../../../utility/models/index';

// SERVICE
import { UtilityService, NotificationService } from '../../../utility/services';
import { UserService } from '../../services';
import { CountryService } from '../../../country/services';

// import { ToastrService } from 'ngx-toastr';

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
    private utilityService: UtilityService,
    private notificationService: NotificationService,
    private userService: UserService,
    private countryService: CountryService,
    // private toastr: ToastrService
  ) {
    // this.countries.push({ id: '1', country_code: '55', name: 'Brazil' });
    // this.countries.push({ id: '2', country_code: '51', name: 'Perú' });
    this.getAllCountries();
    // this.toastr.success('Hello world!', 'Toastr fun!');
  }

  ngOnInit() { }

  getAllCountries() {
    this.countryService.getAll().subscribe((response: Response) => {

      // this.utilsService.openSnackBar(response.message, 'OK');
      console.log(response.message);
      console.log(response);
      //loading.dismiss();
      if (response.status) {

        this.countries = response.result;
        // if(this.countries.length > 0)
        //   this.loginForm.controls['country_code'].setValue(this.countries[0].country_code);
      }

    }, error => {
      console.log(error);
      // this.utilsService.openSnackBar(error);
      //loading.dismiss();
    });
  }

  getFormValues() {

    let userLogin = new User();

    userLogin.id = this.loginForm.value.id;
    userLogin.country_code = this.loginForm.value.country_code;
    userLogin.identification = this.loginForm.value.identification;
    userLogin.password = this.loginForm.value.password;

    console.log('userLogin', userLogin);

    return userLogin;
  }

  login() {

    // this.loginForm.setValue({'country_code': 55});


    if (this.loginForm.invalid) {
      this.errorsList = this.utilityService.getFormError(this.loginForm);
      this.notificationService.error(this.errorsList[0]);
      console.log('error ', this.errorsList[0]);
      return;
    }

    this.userLogin = this.getFormValues();

    this.userService.login(this.userLogin).subscribe((response: Response) => {

      //this.utilityService.openSnackBar(response.message, 'OK');
      console.log(response.message);
      //loading.dismiss();

      if (response.status) {
        this.notificationService.success(response.message);
        //this.authService.login(response.result);
        //this.router.navigate(['/dashboard']);
      }
      else {
        this.notificationService.error(response.message);
      }

    }, (error: any) => {
      console.log(error);
      //this.utilityService.openSnackBar(error);
      this.notificationService.error(error);
      //loading.dismiss();
    });
  }
}

// this.countryForm.controls['country'].setValue(this.default, {onlySelf: true});

// WEBS
