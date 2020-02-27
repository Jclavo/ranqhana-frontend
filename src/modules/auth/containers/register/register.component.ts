import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// MODELS
import { User } from '../../models/user.model';
import { Country } from '../../../country/models';
import { Response } from '../../../utility/models/index';

// SERVICE
import { UtilityService, NotificationService } from '../../../utility/services';
import { UserService } from '../../services';
import { CountryService } from '../../../country/services';

@Component({
    selector: 'sb-register',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './register.component.html',
    styleUrls: ['register.component.scss'],
})
export class RegisterComponent implements OnInit {

    public countries: Array<Country> = [];

    public errorsList: Array<string> = [];

    public userRegister = new User();

    registerForm: FormGroup = this.fb.group({
        country_code: ['', [Validators.required]],
        name: ['', [Validators.required]],
        identification: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        c_password: ['', [Validators.required]],
        store_id: ['1', [Validators.required]]
    },
        {
            validator: this.MustMatch('password', 'c_password')
        });


    constructor(
        private fb: FormBuilder,
        private utilityService: UtilityService,
        private notificationService: NotificationService,
        private userService: UserService,
        private countryService: CountryService,
        private router: Router
    ) {
        this.getAllCountries();

    }

    ngOnInit() { }

    getAllCountries() {
        this.countryService.getAll().subscribe((response: Response) => {

            if (response.status)
                this.countries = response.result;

        }, error => {
            this.notificationService.error(error);
        });
    }

    getFormValues() {

        let userRegister = new User();

        userRegister.country_code = this.registerForm.value.country_code;
        userRegister.name = this.registerForm.value.identification;
        userRegister.email = this.registerForm.value.email;
        userRegister.identification = this.registerForm.value.identification;
        userRegister.password = this.registerForm.value.password;
        userRegister.c_password = this.registerForm.value.c_password;
        userRegister.store_id = this.registerForm.value.store_id;

        console.log('userRegister', userRegister);

        return userRegister;
    }

    signUp() {
        console.log('register...');
    }

    register() {

        if (this.registerForm.invalid) {
            this.errorsList = this.utilityService.getFormError(this.registerForm);
            this.notificationService.error(this.errorsList[0]);
        }

        this.userRegister = this.getFormValues();

        this.userService.register(this.userRegister).subscribe((response: Response) => {

            if (response.status) {
                this.notificationService.success(response.message);
                this.router.navigate(['/login']);
              }
              else {
                this.notificationService.error(response.message);
              }

        }, (error: any) => {
            console.log(error);
            this.notificationService.error(error);
          });
    }

    MustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                // return if another validator has already found an error on the matchingControl
                return;
            }

            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }
}
