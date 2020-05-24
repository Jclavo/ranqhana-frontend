import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// MODELS
import { User } from '@modules/users/models';
import { Response, Mask } from '@modules/utility/models/index';

// SERVICE
import { UtilityService, NotificationService } from '@modules/utility/services';
import { UserService } from '@modules/users/services';
import { StoreService } from '@modules/stores/services';

//UTILS
import { FormUtils } from "@modules/utility/utils";
import { AuthService } from '@modules/auth/services';
import { Store } from '@modules/stores/models';

@Component({
    selector: 'sb-register',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './register.component.html',
    styleUrls: ['register.component.scss'],
})
export class RegisterComponent implements OnInit {

    public errorsList: Array<string> = [];

    public user = new User();
    public mask = new Mask();
    private store = new Store();

    registerForm: FormGroup = this.fb.group({
        store_id: ['', [Validators.required]],
        identification: ['', [Validators.required]],
        name: ['', [Validators.required, Validators.maxLength(45)]],
        lastname: ['', [Validators.required, Validators.maxLength(45)]],
        email: ['', [Validators.email, Validators.maxLength(45)]],
        phone: [''],
        address: ['']
    });

    constructor(
        private fb: FormBuilder,
        private utilityService: UtilityService,
        private notificationService: NotificationService,
        private userService: UserService,
        private storeService: StoreService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
    ) {
    }

    ngOnInit() {
        this.store.id = this.activatedRoute.snapshot.paramMap.get('store_id') ?
                        Number(this.activatedRoute.snapshot.paramMap.get('store_id')) : 0;
        this.store.id  ? this.getStoreById(this.store.id) : null;
    }

    getStoreById(id: number) {

        this.storeService.getById(id).subscribe(response => {
          if(response.status){
            this.store = response.result; 
            this.mask = FormUtils.getMaskValidationByCountry(this.store.countryCode);
            this.registerForm.controls['store_id'].setValue(this.store.id);
          }else{
            this.notificationService.error(response.message);
          } 
        }, error => {
          this.notificationService.error(error);
          this.authService.raiseError();
        });
    }

    register() {

        if (this.registerForm.invalid) {
            this.errorsList = this.utilityService.getFormError(this.registerForm);
            this.notificationService.error(this.errorsList[0]);
            return;
        }

        this.user = FormUtils.moveFormValuesToModel(this.registerForm.value, this.user);

        this.userService.register(this.user).subscribe((response: Response) => {

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

}
