import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

//Services
import { UserService, UserDetailsService } from "../../services";
import { AuthService } from "@modules/auth/services";
import { RoleService } from "@modules/roles/services";

//MODELS
import { Mask, FormMessage } from '@modules/utility/models';
import { Role, UserRoles  } from '@modules/roles/models';
import { User } from '../../models';

//UTILS
import { FormUtils, CustomValidator } from "@modules/utility/utils";
import { NotificationService, UtilityService, LanguageService } from '@modules/utility/services';

@Component({
  selector: 'sb-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public roles: Array<Role> = [];
  public user = new User();

  private errorsListForm: Array<FormMessage> = [];

  public mask = new Mask();
  public initialUserRolesIDs: Array<any> = [];

  userForm: FormGroup = this.formBuilder.group({
    id: [''],
    identification: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.maxLength(45)]],
    lastname: ['', [Validators.required, Validators.maxLength(45)]],
    password: ['', [Validators.minLength(8), Validators.maxLength(45)]],
    repassword: ['', [Validators.minLength(8), Validators.maxLength(45)]],
    email: ['', [Validators.email, Validators.maxLength(45)]],
    phone: ['', [Validators.required]],
    address: ['', [Validators.required]],
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
    private utilityService: UtilityService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.getRoles(this.authService.getUserCompanyID(),this.authService.getUserProjectID());
    // this.getStores();
    this.user.id = this.activatedRoute.snapshot.paramMap.get('id') ? Number(this.activatedRoute.snapshot.paramMap.get('id')) : 0;
    this.user.id ? this.getUserById(this.user.id) : null;
    
    // get mask by country
    this.mask = FormUtils.getMaskValidationByCountry(this.authService.getUserCountryCode());
    
  }

  getRoles(company_id: number, project_id: number) {

    this.roleService.getByCompanyProject(company_id, project_id).subscribe(response => {

      if (response.status) {
        this.roles = response.result;
        this.roles.shift(); 
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
        this.initialUserRolesIDs = response.result?.rolesID;
        this.userForm.controls['roles'].setValue(this.initialUserRolesIDs);
        
        //set mask
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
      this.errorsListForm = this.utilityService.getFormError(this.userForm);
      if(this.errorsListForm.length > 0){
        this.errorsListForm[0].setKey(this.languageService.getI18n('user.field.' + this.errorsListForm[0].getKey()));
        this.notificationService.error(this.errorsListForm[0].getMessage());
      }
      return;
    }

    this.user = FormUtils.moveFormValuesToModel(this.userForm.value, this.user);

    if (this.user.universal_person_id > 0) {
      this.updatePerson(this.user);
    }
    else {
      this.createPerson(this.user);
    }
  }

  createPerson(user: User) {
    this.userDetailsService.create(user).subscribe(response => {

      if (response.status) {
        // this.notificationService.success(response.message);
        this.user.universal_person_id = response.result?.universal_person_id;
        this.user.company_id = this.authService.getUserCompanyID();
        this.user.project_id = this.authService.getUserProjectID();
        this.user.universal_person_id ? this.createUser(this.user) : null;
        
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  updatePerson(user: User) {
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
        this.notificationService.success(response.message);
        this.user.id = response.result?.id;
        this.user.id ? this.assignMassiveRole() : null;
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
        this.notificationService.success(response.message);
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

    //Check if roles have been modified.
    if(this.initialUserRolesIDs.toString() == userRoles.roles.toString()){
      this.authService.getUserID() == this.user.id ? this.router.navigate(['/dashboard']) : this.router.navigate(['/users']);
      return;
    }

    this.userService.assignMassiveRole(userRoles).subscribe(response => {

      if (response.status) {
        this.authService.getUserID() == this.user.id ? this.router.navigate(['/dashboard']) : this.router.navigate(['/users']);
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
