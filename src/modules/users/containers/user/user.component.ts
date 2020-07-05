import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

//Services
import { UserService, UserDetailsService } from "../../services";
import { AuthService } from "@modules/auth/services";
import { RoleService } from "@modules/roles/services";

//MODELS
import { SearchOptions, Mask } from '@modules/utility/models';
import { Role, UserRoles  } from '@modules/roles/models';
import { User } from '../../models';

//UTILS
import { FormUtils, CustomValidator } from "@modules/utility/utils";
import { NotificationService } from '@modules/utility/services';

@Component({
  selector: 'sb-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public roles: Array<Role> = [];
  public user = new User();

  private errorsListForm: Array<string> = [];

  public mask = new Mask();

  userForm: FormGroup = this.formBuilder.group({
    id: [''],
    identification: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.maxLength(45)]],
    lastname: ['', [Validators.required, Validators.maxLength(45)]],
    password: ['', [CustomValidator.validatePassword]],
    repassword: ['', [CustomValidator.validatePassword]],
    email: ['', [Validators.email, Validators.maxLength(45)]],
    phone: [''],
    address: [''],
    roles: [[]],
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
    private userDetailsService: UserDetailsService,
    private roleService: RoleService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getRoles(this.authService.getUserProjectID());
    // this.getStores();
    this.user.id = this.activatedRoute.snapshot.paramMap.get('id') ? Number(this.activatedRoute.snapshot.paramMap.get('id')) : 0;
    this.user.id ? this.getUserById(this.user.id) : null;
    
    // get mask by country
    this.mask = FormUtils.getMaskValidationByCountry(this.authService.getUserCountryCode());
    
  }

  getRoles(project_id: number) {

    this.roleService.getByProject(project_id).subscribe(response => {

      if (response.status) {
        this.roles = response.result;
      }else{
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });

  }

  getUserById(id: number) {
    this.userService.getById(id).subscribe(response => {

      if (response.status) {
        this.user = response.result;

        this.userForm = FormUtils.moveModelValuesToForm(this.userForm, this.user);
        //set roles
        this.userForm.controls['roles'].setValue(response.result?.rolesID);

        this.mask = FormUtils.getMaskValidationByCountry(this.authService.getUserCountryCode());
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  save() {

    if (this.userForm.invalid) {
      this.errorsListForm = FormUtils.getFormError(this.userForm);
      this.notificationService.error(this.errorsListForm[0]);
      return;
    }

    this.user = FormUtils.moveFormValuesToModel(this.userForm.value, this.user);

    // console.log('user: ', this.user);

    if (this.user.id) {
      this.updateUserDetail(this.user);
    }
    else {
      this.createUserDetail(this.user);
    }
  }

  createUserDetail(user: User) {
    this.userDetailsService.create(user).subscribe(response => {

      if (response.status) {
        // this.notificationService.success(response.message);
        this.user.user_detail_id = response.result?.user_detail_id;
        this.user.company_id = this.authService.getUserCompanyID();
        this.user.project_id = this.authService.getUserProjectID();
        this.user.user_detail_id ? this.createUser(this.user) : null;
        
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  updateUserDetail(user: User) {
    this.userDetailsService.update(user).subscribe(response => {

      if (response.status) {
        // this.notificationService.success(response.message);
        this.updateUser(this.user);
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  createUser(user: User) {
    this.userService.create(user).subscribe(response => {

      if (response.status) {
        // this.notificationService.success(response.message);
        this.assignMassiveRole();

      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  updateUser(user: User) {
    this.userService.update(user).subscribe(response => {

      if (response.status) {
        // this.notificationService.success(response.message);
        // this.router.navigate(['/users']);
        this.assignMassiveRole();
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }


  assignMassiveRole() {

    let userRoles = new UserRoles();
    userRoles.user_id = this.user.id;
    userRoles.roles = this.userForm.value.roles;

    this.userService.assignMassiveRole(userRoles).subscribe(response => {

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
