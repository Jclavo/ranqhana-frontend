import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

//MODELS
import { SellInvoice, Invoice } from "../../models";
import { User, SearchUserOptions } from "@modules/users/models";
import { Role } from "@modules/roles/models";

//SERVICES
import { NotificationService } from '@modules/utility/services';
import { AuthService } from "@modules/auth/services";
import { UserService } from "@modules/users/services";
import { InvoiceService } from '../../services';

@Component({
  selector: 'sb-add-aditional-info',
  templateUrl: './add-aditional-info.component.html',
  styleUrls: ['./add-aditional-info.component.scss']
})
export class AddAditionalInfoComponent implements OnInit {

  @Input() invoice_id: number = 0;

  public invoice = new Invoice();
  public searchUserOption = new SearchUserOptions();
  public externalUser: any;

  constructor(
    public activeModal: NgbActiveModal,
    public notificationService: NotificationService,
    public invoiceService: InvoiceService,
    public authService: AuthService,
    public userService: UserService,
  ) { }


  formatter = (user: User) => user.identification + ' - ' + user.name + ' ' + user.lastname;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(searchValue =>
        this.getUsers(searchValue)
      )
    )

  getUsers(searchValue: string) {

    this.searchUserOption.searchValue = searchValue;
    this.searchUserOption.role_id = Role.getClientID();

    return this.userService.get(this.searchUserOption).pipe(
      map(response => {

        if (response.status) {
          let external_users: Array<User> = [];
          external_users = response.result;
          return external_users;
        } else {
          return []
        }
      }, (error: any) => {
        this.notificationService.error(error);
        this.authService.raiseError();
      }))

  }

  ngOnInit(): void {
  }

  print() {
  }

  save() {

    this.invoice.id = this.invoice_id;
    this.invoice.external_user_id = this.externalUser?.id;

    this.invoice.serie = this.invoice.serie?.toUpperCase();
    this.updateInvoice(this.invoice);

  }

  updateInvoice(invoice: SellInvoice) {
    this.invoiceService.update(invoice).subscribe(response => {

      if (response.status) {
        this.notificationService.success(response.message);
        this.activeModal.close(true);
      }
      else {
        this.notificationService.error(response.message);
        this.activeModal.close(false);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

}
