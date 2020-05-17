import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
import { FormUtils } from "@modules/utility/utils";

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
    store_id: ['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private userService: UserService,
    private authService: AuthService,
    private storeService: StoreService,
    private utilityService: UtilityService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getStores();
  }
  
  getStores(){
    this.storeService.get(new SearchOptions()).subscribe(response => {
      response.status ? this.stores = response.result : this.notificationService.error(response.message);
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
      //update
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

}
