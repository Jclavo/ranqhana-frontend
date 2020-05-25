import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//MODELS
import { Store } from "../../models";
import { Country } from "@modules/country/models";

//SERVICES
import { NotificationService } from '@modules/utility/services';
import { AuthService } from "@modules/auth/services";
import { CountryService } from "@modules/country/services";
import { StoreService } from '../../services';

//UTILS
import { FormUtils } from "@modules/utility/utils";

@Component({
  selector: 'sb-store-modal',
  templateUrl: './store-modal.component.html',
  styleUrls: ['./store-modal.component.scss']
})
export class StoreModalComponent implements OnInit {

  @Input() store_id: number = 0;

  public store = new Store();
  public countries: Array<Store> = [];
  private errorsListForm: Array<string> = [];

  storeForm: FormGroup = this.formBuilder.group({
    id: [''],
    name: ['', [Validators.required]],
    country_id: ['', [Validators.required]],
  });
  
  constructor(
    public activeModal: NgbActiveModal,
    public notificationService: NotificationService,
    public storeService: StoreService,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private countryService: CountryService,
  ) { }

  ngOnInit(): void {
    this.getCountries();
    if(this.store_id){
      this.store.id = this.store_id;
      this.getById(this.store.id);
    }
  } 

  getCountries() {
    this.countryService.getAll().subscribe(response => {
      response.status ? this.countries = response.result : this.notificationService.error(response.message);
    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
      this.activeModal.close(false);
    });
  }

  save(){

    if (this.storeForm.invalid) {
      this.errorsListForm = FormUtils.getFormError(this.storeForm);
      this.notificationService.error(this.errorsListForm[0]);
      return;
    }

    this.store = FormUtils.moveFormValuesToModel(this.storeForm.value, this.store);
    this.store.id = this.store_id;

    this.store.id ? this.update(this.store) : this.create(this.store);
  }

  create(store: Store) {
    this.storeService.create(store).subscribe(response => {

      if (response.status) {
        this.notificationService.success(response.message);
        this.activeModal.close(true);
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  update(store: Store)
  {
    this.storeService.update(store).subscribe(response => {

      if (response.status) {
        this.notificationService.success(response.message);
        this.activeModal.close(true);
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  getById(id: number)
  {
    this.storeService.getById(id).subscribe(response => {

      if(response.status){
        this.store = response.result;
        this.storeForm = FormUtils.moveModelValuesToForm(this.storeForm, this.store);
      }
      else{
        this.notificationService.error(response.message);
      } 

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
      this.activeModal.close(false);
    });
  }
 
}
