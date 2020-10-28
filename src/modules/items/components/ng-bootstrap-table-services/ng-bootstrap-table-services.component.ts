import { Component, OnInit, ViewChildren, QueryList, KeyValueDiffer, KeyValueDiffers, HostListener } from '@angular/core';
import { SBSortableHeaderDirective, SortEvent } from '@modules/utility/directives';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

//MODELS
import { Item, SearchItemOptions } from '@modules/items/models';
import { ItemType } from '@modules/item-types/models';

// COMPONENT 
import { ConfirmModalComponent } from '@modules/utility/components';

//SERVICES
import { ItemService } from "../../services";
import { AuthService } from "@modules/auth/services";
import { NotificationService, UtilityService, LanguageService } from '@modules/utility/services';

@Component({
  selector: 'sb-ng-bootstrap-table-services',
  templateUrl: './ng-bootstrap-table-services.component.html',
  styleUrls: ['./ng-bootstrap-table-services.component.scss']
})
export class NgBootstrapTableServicesComponent implements OnInit {

  public searchOption = new SearchItemOptions();
  public services: Array<Item> = [];
  public parameters: any;
  public maxSizePagination: number = 10;

  private searchOptionDiffers: KeyValueDiffer<string, any>;

  public sortedColumn!: string;
  public sortedDirection!: string;

  @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

  constructor(
    private differs: KeyValueDiffers, // to get changes in a object
    private notificationService: NotificationService,
    private serviceService: ItemService,
    private modalService: NgbModal,
    public authService: AuthService,
    private utilityService: UtilityService,
    private languageService: LanguageService
  ) {

    this.searchOptionDiffers = this.differs.find(this.searchOption).create();
  }

  ngOnInit(): void {

    this.getServices();
    this.maxSizePagination = this.utilityService.getMaxSizePagination(window.screen.width);

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any ) {
    this.maxSizePagination = this.utilityService.getMaxSizePagination(event.target.innerWidth);
  }

  ngDoCheck(): void {
    const changes = this.searchOptionDiffers.diff(this.searchOption);
    if (changes) {
      this.getServices();
    }
  }

  onSort({ column, direction }: SortEvent) {
    this.sortedColumn = column;
    this.sortedDirection = direction;

    this.searchOption.sortColumn = this.sortedColumn;
    this.searchOption.sortDirection = this.sortedDirection;
  }


  getServices() {

    this.searchOption.type_id = ItemType.getForService();

    this.serviceService.get(this.searchOption).subscribe(response => {

      if (response.status) {
        this.services = response.result;
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

    modalRef.componentInstance.title = this.languageService.getI18n('service.page.title');
    modalRef.componentInstance.action = this.languageService.getI18n('button.delete');
    modalRef.componentInstance.value = name;

    modalRef.result.then((result) => {
      result ? this.delete(id) : null;
    });

  }

  delete(id: string) {

    this.serviceService.delete(id).subscribe(response => {

      if (response.status) {
        this.notificationService.success(response.message);
        this.getServices();
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
