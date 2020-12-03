import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

//Services
import { UserService, PersonService } from "../../services";
import { AuthService } from "@modules/auth/services";
import { RoleService } from "@modules/roles/services";
import { PersonTypeService } from "@modules/person-types/services";

//MODELS
import { User, SearchUserOptions } from '../../models';
import { Mask, FormMessage } from '@modules/utility/models';
import { Role, UserRoles } from '@modules/roles/models';
import { PersonType } from '@modules/person-types/models';

//UTILS
import { FormUtils, CustomValidator } from "@modules/utility/utils";
import { NotificationService, UtilityService, LanguageService } from '@modules/utility/services';

@Component({
  selector: 'sb-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public PERSON_TYPE_NATURAL = PersonType.getForNatural();
  
  public roles: Array<Role> = [];
  public personTypes: Array<PersonType> = [];
  public user = new User();

  private errorsListForm: Array<FormMessage> = [];

  public mask = new Mask();
  public initialUserRolesIDs: Array<any> = [];

  userForm: FormGroup = this.formBuilder.group({
    id: [''],
    universal_person_id: [''],
    identification: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.maxLength(45)]],
    lastname: [''],
    password: ['', [Validators.minLength(8), Validators.maxLength(45)]],
    repassword: ['', [Validators.minLength(8), Validators.maxLength(45)]],
    email: ['', [Validators.email, Validators.maxLength(45)]],
    phone: ['', [Validators.required]],
    address: ['', [Validators.required]],
    roles: [[]],
    type_id: [PersonType.getForNatural(), [Validators.required]],
    country_code: [this.authService.getUserCountryCode(), [Validators.required]],
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
    private personService: PersonService,
    private roleService: RoleService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private utilityService: UtilityService,
    private languageService: LanguageService,
    private personTypeService: PersonTypeService
  ) { }

  ngOnInit(): void {
    this.getPersonTypes();
    this.getRoles(this.authService.getUserCompanyID(), this.authService.getUserProjectID());
    // this.getStores();
    this.user.id = this.activatedRoute.snapshot.paramMap.get('id') ? Number(this.activatedRoute.snapshot.paramMap.get('id')) : 0;

    if (this.user.id == 0) {
      this.getMask();
    } else {
      this.getUserById(this.user.id)
    }
  }

  onIdentification() {
    this.getPersons();
  }

  onPersonType() {

    if(this.user.id > 0){
      this.userForm.controls['type_id'].setValue(this.user.type_id);
    }else{
      this.getMask();
    }

  }

  getMask() {
    this.user.type_id = this.userForm.value['type_id'];
    this.mask = FormUtils.getMaskValidationByCountry(this.authService.getUserCountryCode(), this.user.type_id);
  }

  getPersonTypes() {
    this.personTypeService.getAll().subscribe(response => {
      if (response.status) {
        this.personTypes = response.result;
      } else {
        this.notificationService.error(response.message);
      }
    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  getRoles(company_id: number, project_id: number) {

    this.roleService.getByCompanyProject(company_id, project_id).subscribe(response => {

      if (response.status) {
        this.roles = response.result;
        this.roles.shift();
      } else {
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
        this.getMask();
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  getPersons() {
    let persons: Array<User> = [];
    let searchOption = new SearchUserOptions();

    searchOption.identification = this.userForm.value['identification'];
    searchOption.type_id = this.userForm.value['type_id'];
    searchOption.country_code = this.userForm.value['country_code'];

    this.personService.get(searchOption).subscribe(response => {

      if (response.status) {
        persons = response.result;
        if (persons.length == 1) {
          this.userForm = FormUtils.moveModelValuesToForm(this.userForm, persons[0]);
        }
        else{
          this.notificationService.error('Identification not found.');
        }
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });

  }

  save() {

    if (this.userForm.invalid) {
      this.errorsListForm = this.utilityService.getFormError(this.userForm);
      if (this.errorsListForm.length > 0) {
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
    this.personService.create(user).subscribe(response => {

      if (response.status) {
        this.user.universal_person_id = response.result?.universal_person_id;

        this.user.type_id == PersonType.getForNatural() ? this.saveUser(this.user) : this.router.navigate(['/users']);

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
    this.personService.update(user).subscribe(response => {

      if (response.status) {
        this.user.type_id == PersonType.getForNatural() ? this.saveUser(this.user) : this.router.navigate(['/users']);
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  saveUser(user: User) {
    user.company_id = this.authService.getUserCompanyID();
    user.project_id = this.authService.getUserProjectID();

    if (user.id > 0) {
      this.updateUser(user);
    }
    else {
      this.createUser(user);
    }
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
    if (this.initialUserRolesIDs.toString() == userRoles.roles.toString()) {
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
