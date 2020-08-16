import { Component, OnInit, ViewChildren, QueryList, KeyValueDiffer, KeyValueDiffers, HostListener } from '@angular/core';
import { SBSortableHeaderDirective, SortEvent } from '@modules/utility/directives';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
//MODELS
import { User, SearchUserOptions} from "../../models";

// COMPONENT 
import { ConfirmModalComponent } from "@modules/utility/components/confirm-modal/confirm-modal.component";

//SERVICES
import { UserService } from "../../services";
import { AuthService } from "@modules/auth/services";
import { NotificationService, UtilityService} from '@modules/utility/services';

@Component({
  selector: 'sb-ng-bootstrap-table-users',
  templateUrl: './ng-bootstrap-table-users.component.html',
  styleUrls: ['./ng-bootstrap-table-users.component.scss']
})
export class NgBootstrapTableUsersComponent implements OnInit {

  public searchOption = new SearchUserOptions();
  public users: Array<User> = [];
  public parameters: any;
  public maxSizePagination: number = 10;

  private searchOptionDiffers: KeyValueDiffer<string, any>;

  public sortedColumn!: string;
  public sortedDirection!: string;

  @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

  constructor(
    private differs: KeyValueDiffers, // to get changes in a object
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private userService: UserService,
    private authService: AuthService,
    private ngbModal: NgbModal,
    private modalService: NgbModal,
    private utilityService: UtilityService,
  ) {

    this.searchOptionDiffers = this.differs.find(this.searchOption).create();
    //Assign current company id
    this.searchOption.company_id = this.authService.getUserCompanyID();
  }

  ngOnInit(): void {
    this.getUsers();
    this.maxSizePagination = this.utilityService.getMaxSizePagination(window.screen.width);
  } 

  @HostListener('window:resize', ['$event'])
  onResize(event: any ) {
    this.maxSizePagination = this.utilityService.getMaxSizePagination(event.target.innerWidth);
  }

  ngDoCheck(): void {
    const changes = this.searchOptionDiffers.diff(this.searchOption);
    if (changes) {
      this.getUsers();
    }
  }

  onSort({ column, direction }: SortEvent) {
    this.sortedColumn = column;
    this.sortedDirection = direction;

    this.searchOption.sortColumn = this.sortedColumn;
    this.searchOption.sortDirection = this.sortedDirection;
  }

  getUsers() {

    this.userService.get(this.searchOption).subscribe(response => {

      if (response.status) {
        this.users = response.result;
        this.searchOption.total = response.records;
      }else{
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });

  }

  modalDelete(id: string, name: string) {
    
    const modalRef = this.modalService.open(ConfirmModalComponent, { centered: true, backdrop: 'static' });

    modalRef.componentInstance.title = 'Item';
    modalRef.componentInstance.action = 'delete';
    modalRef.componentInstance.value = name;

    modalRef.result.then((result) => {
      result ? this.delete(id) : null;
    });

  }

  delete(id: string) {

    this.userService.delete(id).subscribe(response => {

      if (response.status) {
        this.notificationService.success(response.message);
        this.getUsers();
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
