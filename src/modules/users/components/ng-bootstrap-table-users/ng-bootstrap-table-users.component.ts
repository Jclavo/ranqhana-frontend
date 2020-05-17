import { Component, OnInit, ViewChildren, QueryList, KeyValueDiffer, KeyValueDiffers, HostListener } from '@angular/core';
import { SBSortableHeaderDirective, SortEvent } from '@modules/utility/directives';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
//MODELS
import { SearchOptions } from '@modules/utility/models';
import { User} from "../../models";

// COMPONENT 
// import { ConfirmModalComponent } from "@modules/utility/components/confirm-modal/confirm-modal.component";

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

  public searchOption = new SearchOptions();
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
    private utilityService: UtilityService,
  ) {

    this.searchOptionDiffers = this.differs.find(this.searchOption).create();
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

}
