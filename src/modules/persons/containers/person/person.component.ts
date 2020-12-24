import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

//Services
import { PersonService } from "../../services";
import { AuthService } from "@modules/auth/services";
import { RoleService } from "@modules/roles/services";
import { PersonTypeService } from "@modules/person-types/services";
import { UserService } from "@modules/users/services";

//MODELS
// import { User, SearchUserOptions } from '../../models';
import { Mask, FormMessage } from '@modules/utility/models';
import { Role, UserRoles } from '@modules/roles/models';
import { PersonType } from '@modules/person-types/models';
import { User, SearchUserOptions } from '@modules/users/models';

//UTILS
import { FormUtils, CustomValidator } from "@modules/utility/utils";
import { NotificationService, UtilityService, LanguageService } from '@modules/utility/services';
import { Person } from '@modules/persons/models';


@Component({
  selector: 'sb-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

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
    country_code: [this.authService.getCompanyCountryCode(), [Validators.required]],
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
    this.getRoles(this.authService.getCompanyID(), this.authService.getUserProjectID());

    this.user.id = Number(this.activatedRoute.snapshot.paramMap.get('id') ?? 0);
    this.user.universal_person_id = Number(this.activatedRoute.snapshot.paramMap.get('universal_person_id') ?? 0);

    if (this.user.id == 0 && this.user.universal_person_id == 0) {
      this.getMask();
    } else {

      if (this.user.id > 0) {
        this.getUserById(this.user.id)
      } else if (this.user.universal_person_id > 0) {
        this.getPersonById(this.user.universal_person_id);
      }
    }
  }

  setUserToForm(user: User) {

    this.userForm = FormUtils.setFormValue(this.userForm, 'id', user.id);
    this.userForm = FormUtils.setFormValue(this.userForm, 'identification', user.person.identification);
    this.userForm = FormUtils.setFormValue(this.userForm, 'universal_person_id', user.universal_person_id ?? user.person.id);

    this.userForm = this.setPersonToForm(this.userForm, user.person);

    // roles: [[]],
    this.userForm = FormUtils.setFormValue(this.userForm, 'roles', this.user.rolesID);

    this.userForm = FormUtils.setFormValue(this.userForm, 'password', user.password);
    this.userForm = FormUtils.setFormValue(this.userForm, 'repassword', user.repassword);

    return this.userForm;
  }

  setPersonToForm(userForm: FormGroup, person: Person) {

    this.userForm = FormUtils.setFormValue(this.userForm, 'universal_person_id',person.id);
    userForm = FormUtils.setFormValue(this.userForm, 'name', person.name);
    userForm = FormUtils.setFormValue(this.userForm, 'lastname', person.lastname);
    userForm = FormUtils.setFormValue(this.userForm, 'email', person.email);
    userForm = FormUtils.setFormValue(this.userForm, 'phone', person.phone);
    userForm = FormUtils.setFormValue(this.userForm, 'address', person.address);
    userForm = FormUtils.setFormValue(this.userForm, 'type_id', person.type_id ?? PersonType.getForNatural());
    userForm = FormUtils.setFormValue(this.userForm, 'country_code', person.country_code ?? this.authService.getCompanyCountryCode());

    return userForm;
  }

  setFormToUser(userForm: any) {

    let user = new User();

    user.id = FormUtils.getFormValue(userForm, 'id');
    user.person.identification = FormUtils.getFormValue(userForm, 'identification');
    user.universal_person_id = FormUtils.getFormValue(userForm, 'universal_person_id');

    user.person.id = FormUtils.getFormValue(userForm, 'universal_person_id');
    user.person.name = FormUtils.getFormValue(userForm, 'name');
    user.person.lastname = FormUtils.getFormValue(userForm, 'lastname');
    user.person.email = FormUtils.getFormValue(userForm, 'email');
    user.person.phone = FormUtils.getFormValue(userForm, 'phone');
    user.person.address = FormUtils.getFormValue(userForm, 'address');
    user.person.type_id = FormUtils.getFormValue(userForm, 'type_id');
    user.person.country_code = FormUtils.getFormValue(userForm, 'country_code');

    // roles: [[]],
    user.rolesID = FormUtils.getFormValue(userForm, 'roles');

    //
    user.password = FormUtils.getFormValue(userForm, 'password');
    user.repassword = FormUtils.getFormValue(userForm, 'repassword');

    return user;
  }


  onIdentification() {
    this.getPersons();
  }

  onPersonType() {

    if (this.user.id > 0) {
      this.userForm = FormUtils.setFormValue(this.userForm, 'type_id', this.user.person.type_id);
    } else {
      this.getMask();
    }

  }

  getMask() {
    this.user.person.type_id = FormUtils.getFormValue(this.userForm, 'type_id');
    this.mask = FormUtils.getMaskValidationByCountry(this.authService.getCompanyCountryCode(), this.user.person.type_id);
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
        this.initialUserRolesIDs = this.user.rolesID;

        this.userForm = this.setUserToForm(this.user);

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

  getPersonById(id: number) {

    this.personService.getById(id).subscribe(response => {

      if (response.status) {
        this.user.person = response.result;

        this.userForm = this.setUserToForm(this.user);

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
    let persons: Array<Person> = [];
    let searchOption = new SearchUserOptions();

    searchOption.identification = FormUtils.getFormValue(this.userForm, 'identification');
    searchOption.type_id = FormUtils.getFormValue(this.userForm, 'type_id');
    searchOption.country_code = FormUtils.getFormValue(this.userForm, 'country_code');

    this.personService.get(searchOption).subscribe(response => {

      if (response.status) {
        persons = response.result;
        if (persons.length == 1) {
          this.userForm = this.setPersonToForm(this.userForm, persons[0]);
          this.notificationService.success(this.languageService.getI18n('person.message.personFound'));
        }
        else {
          let person = new Person();
          person.type_id = searchOption.type_id;
          person.country_code = searchOption.country_code;

          this.userForm = this.setPersonToForm(this.userForm, person);
          this.notificationService.error(this.languageService.getI18n('person.message.personNotFound'));
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
        this.errorsListForm[0].setKey(this.languageService.getI18n('person.field.' + this.errorsListForm[0].getKey()));
        this.notificationService.error(this.errorsListForm[0].getMessage());
      }
      return;
    }

    this.user = this.setFormToUser(this.userForm);

    if (this.user.universal_person_id > 0) {
      this.updatePerson(this.user);
    }
    else {
      this.createPerson(this.user);
    }
  }

  createPerson(user: User) {
    this.personService.create(user.person).subscribe(response => {

      if (response.status) {
        this.user.universal_person_id = response.result?.id;

        this.user.person.type_id == PersonType.getForNatural() ? this.saveUser(this.user) : this.router.navigate(['/persons']);

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

    this.personService.update(user.person).subscribe(response => {

      if (response.status) {
        this.user.person.type_id == PersonType.getForNatural() ? this.saveUser(this.user) : this.router.navigate(['/persons']);
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
    user.company_id = this.authService.getCompanyID();
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
