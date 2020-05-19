import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

//Services
import { StoreService } from "@modules/stores/services";
import { UserService } from "../../services";
import { AuthService } from "@modules/auth/services";
import { NotificationService, UtilityService} from '@modules/utility/services';

//MODELS
import { SearchOptions } from '@modules/utility/models';
import { Store } from '@modules/stores/models';
import { User } from '../../models';

//UTILS
import { FormUtils, CustomValidator } from "@modules/utility/utils";

@Component({
  selector: 'sb-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public stores: Array<Store> = [];
  public user = new User();

  private errorsListForm: Array<string> = [];

  userForm: FormGroup = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(45)]],
      identification: ['', [Validators.required, Validators.maxLength(11)] ],
      email: ['', [Validators.email,Validators.maxLength(45)]],
      store_id: ['', [Validators.required]],
      password: ['', [CustomValidator.validatePassword]],
      repassword: ['', [CustomValidator.validatePassword]]
    },
    {
      validator: CustomValidator.mustMatch('password', 'repassword')
    }
  );

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private userService: UserService,
    private authService: AuthService,
    private storeService: StoreService,
    private utilityService: UtilityService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getStores();
    this.user.id = this.activatedRoute.snapshot.paramMap.get('id') ? Number(this.activatedRoute.snapshot.paramMap.get('id')) : 0;
    this.user.id ? this.getById(this.user.id) : null;
  }
  
  getStores(){
    this.storeService.get(new SearchOptions()).subscribe(response => {
      response.status ? this.stores = response.result : this.notificationService.error(response.message);
    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  getById(id: number)
  {
    this.userService.getById(id).subscribe(response => {

      if (response.status){ 
        this.user = response.result;
        this.userForm = FormUtils.moveModelValuesToForm(this.userForm,this.user);
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  save(){

    if (this.userForm.invalid) {
      this.errorsListForm = FormUtils.getFormError(this.userForm);
      this.notificationService.error(this.errorsListForm[0]);
      return;
    }

    this.user = FormUtils.moveFormValuesToModel(this.userForm.value, this.user);

    if(this.user.id){
      this.update(this.user);
    }
    else{
      this.create(this.user);
    }
  }

  create(user: User) {
    this.userService.create(user).subscribe(response => {

      if (response.status) {
        this.notificationService.success(response.message);
        this.router.navigate(['/users']);
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  update(user: User) {
    this.userService.update(user).subscribe(response => {

      if (response.status) {
        this.notificationService.success(response.message);
        this.router.navigate(['/users']);
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

}
