import { Component, OnInit, ViewChildren, QueryList, KeyValueDiffer, KeyValueDiffers, HostListener } from '@angular/core';
import { SBSortableHeaderDirective, SortEvent } from '@modules/utility/directives';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
//MODELS
import { Person, SearchPersonOptions } from "../../models";
import { Role } from '@modules/roles/models';

// COMPONENT 
import { ConfirmModalComponent } from "@modules/utility/components/confirm-modal/confirm-modal.component";

//SERVICES
import { PersonService } from "../../services";
import { AuthService } from "@modules/auth/services";
import { NotificationService, UtilityService, LanguageService } from '@modules/utility/services';
import { RoleService } from "@modules/roles/services";
import { PersonType } from '@modules/person-types/models';


@Component({
  selector: 'sb-ng-bootstrap-table-persons',
  templateUrl: './ng-bootstrap-table-persons.component.html',
  styleUrls: ['./ng-bootstrap-table-persons.component.scss']
})
export class NgBootstrapTablePersonsComponent implements OnInit {

  public searchOption = new SearchPersonOptions();
  public persons: Array<Person> = [];
  public roles: Array<Role> = [];
  public parameters: any;
  public maxSizePagination: number = 10;

  private searchOptionDiffers: KeyValueDiffer<string, any>;

  public sortedColumn!: string;
  public sortedDirection!: string;

  @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

  constructor(
    private differs: KeyValueDiffers, // to get changes in a object
    private notificationService: NotificationService,
    private personService: PersonService,
    public authService: AuthService,
    private modalService: NgbModal,
    private utilityService: UtilityService,
    private roleService: RoleService,
    private languageService: LanguageService
  ) {

    this.searchOptionDiffers = this.differs.find(this.searchOption).create();

    this.searchOption.country_code = this.authService.getCompanyCountryCode();
    this.searchOption.type_id = PersonType.getForJuridical();

  }

  ngOnInit(): void {
    this.getPersons();
    this.maxSizePagination = this.utilityService.getMaxSizePagination(window.screen.width);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.maxSizePagination = this.utilityService.getMaxSizePagination(event.target.innerWidth);
  }

  ngDoCheck(): void {
    const changes = this.searchOptionDiffers.diff(this.searchOption);
    if (changes) {
      this.getPersons();
    }
  }

  onSort({ column, direction }: SortEvent) {
    this.sortedColumn = column;
    this.sortedDirection = direction;

    this.searchOption.sortColumn = this.sortedColumn;
    this.searchOption.sortDirection = this.sortedDirection;
  }

  getPersons() {

    this.personService.get(this.searchOption).subscribe(response => {

      if (response.status) {
        this.persons = response.result;
        this.searchOption.total = response.records;
      } else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });

  }

  modalDelete(id: string, name: string) {

    const modalRef = this.modalService.open(ConfirmModalComponent, { centered: true, backdrop: 'static' });

    modalRef.componentInstance.title = this.languageService.getI18n('person.page.title');
    modalRef.componentInstance.action = this.languageService.getI18n('button.delete');
    modalRef.componentInstance.value = name;

    modalRef.result.then((result) => {
      result ? this.delete(id) : null;
    });

  }

  delete(id: string) {

    this.personService.delete(id).subscribe(response => {

      if (response.status) {
        this.notificationService.success(response.message);
        this.getPersons();
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
