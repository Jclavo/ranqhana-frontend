import { Component, OnInit, ViewChildren, QueryList, KeyValueDiffer, KeyValueDiffers, HostListener } from '@angular/core';
import { SBSortableHeaderDirective, SortEvent } from '@modules/utility/directives';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

//MODELS
import { SearchOptions } from '@modules/utility/models';
import { Unit } from "../../models";

// COMPONENT 
import { ConfirmModalComponent } from '@modules/utility/components';
import { UnitModalComponent } from '../unit-modal/unit-modal.component';

//SERVICES
import { UnitService } from "../../services";
import { AuthService } from "@modules/auth/services";
import { NotificationService, UtilityService, LanguageService } from '@modules/utility/services';


@Component({
  selector: 'sb-ng-bootstrap-table-units',
  templateUrl: './ng-bootstrap-table-units.component.html',
  styleUrls: ['./ng-bootstrap-table-units.component.scss']
})
export class NgBootstrapTableUnitsComponent implements OnInit {

  public searchOption = new SearchOptions();
  public units: Array<Unit> = [];
  public parameters: any;
  public maxSizePagination: number = 10;

  private searchOptionDiffers: KeyValueDiffer<string, any>;

  public sortedColumn!: string;
  public sortedDirection!: string;

  @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

  constructor(
    private differs: KeyValueDiffers, // to get changes in a object
    private notificationService: NotificationService,
    private unitService: UnitService,
    private modalService: NgbModal,
    private authService: AuthService,
    private utilityService: UtilityService,
    private languageService: LanguageService
  ) {

    this.searchOptionDiffers = this.differs.find(this.searchOption).create();
  }

  ngOnInit(): void {

    this.getunits();
    this.maxSizePagination = this.utilityService.getMaxSizePagination(window.screen.width);

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any ) {
    this.maxSizePagination = this.utilityService.getMaxSizePagination(event.target.innerWidth);
  }

  ngDoCheck(): void {
    const changes = this.searchOptionDiffers.diff(this.searchOption);
    if (changes) {
      this.getunits();
    }
  }

  onSort({ column, direction }: SortEvent) {
    this.sortedColumn = column;
    this.sortedDirection = direction;

    this.searchOption.sortColumn = this.sortedColumn;
    this.searchOption.sortDirection = this.sortedDirection;
  }


  getunits() {

    let parameters = this.searchOption;

    this.unitService.pagination(parameters).subscribe(response => {

      if (response.status) {
        this.units = response.result;
        this.searchOption.total = response.records;
      }else{
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });

  }

  modalDelete(id: string, description: string) {
    
    const modalRef = this.modalService.open(ConfirmModalComponent, { centered: true, backdrop: 'static' });

    modalRef.componentInstance.title = this.languageService.getI18n('unit.page.title');
    modalRef.componentInstance.action = this.languageService.getI18n('button.delete');
    modalRef.componentInstance.value = description;

    modalRef.result.then((result) => {
      result ? this.delete(id) : null;
    });

  }

  delete(id: string) {

    this.unitService.delete(id).subscribe(response => {

      if (response.status) {
        this.notificationService.success(response.message);
        this.getunits();
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }


  openUnitModal(id: string = '') {
    const modalRef = this.modalService.open(UnitModalComponent, { centered: true, backdrop: 'static' });

    modalRef.componentInstance.unit_id = id;
    // modalRef.componentInstance.value = name;

    modalRef.result.then((result) => {
      result ? this.getunits() : null;
    });
  }

}
