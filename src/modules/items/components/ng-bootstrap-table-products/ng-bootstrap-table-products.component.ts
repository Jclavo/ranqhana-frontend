import { Component, OnInit, ViewChildren, QueryList, KeyValueDiffer, KeyValueDiffers, HostListener } from '@angular/core';
import { SBSortableHeaderDirective, SortEvent } from '@modules/utility/directives';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

//MODELS
import { Item, SearchItemOptions } from '@modules/items/models';
import { ItemType } from '@modules/item-types/models';

// COMPONENT 
import { ConfirmModalComponent, BarcodePrintModalComponent } from '@modules/utility/components';

//SERVICES
import { ItemService } from "../../services";
import { AuthService } from "@modules/auth/services";
import { NotificationService, UtilityService, LanguageService } from '@modules/utility/services';

@Component({
  selector: 'sb-ng-bootstrap-table-products',
  templateUrl: './ng-bootstrap-table-products.component.html',
  styleUrls: ['./ng-bootstrap-table-products.component.scss']
})
export class NgBootstrapTableProductsComponent implements OnInit {

  public searchOption = new SearchItemOptions();
  public items: Array<Item> = [];
  public parameters: any;
  public maxSizePagination: number = 10;

  private searchOptionDiffers: KeyValueDiffer<string, any>;

  public sortedColumn!: string;
  public sortedDirection!: string;

  @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

  constructor(
    private differs: KeyValueDiffers, // to get changes in a object
    private notificationService: NotificationService,
    private itemService: ItemService,
    private modalService: NgbModal,
    public authService: AuthService,
    private utilityService: UtilityService,
    private languageService: LanguageService
  ) {

    this.searchOptionDiffers = this.differs.find(this.searchOption).create();
  }

  ngOnInit(): void {

    this.getItems();
    this.maxSizePagination = this.utilityService.getMaxSizePagination(window.screen.width);

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.maxSizePagination = this.utilityService.getMaxSizePagination(event.target.innerWidth);
  }

  ngDoCheck(): void {
    const changes = this.searchOptionDiffers.diff(this.searchOption);
    if (changes) {
      this.getItems();
    }
  }

  onSort({ column, direction }: SortEvent) {
    this.sortedColumn = column;
    this.sortedDirection = direction;

    this.searchOption.sortColumn = this.sortedColumn;
    this.searchOption.sortDirection = this.sortedDirection;
  }


  getItems() {

    this.searchOption.type_id = ItemType.getForProduct();
    this.itemService.get(this.searchOption).subscribe(response => {

      if (response.status) {
        this.items = response.result;
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

    modalRef.componentInstance.title = this.languageService.getI18n('product.page.title');
    modalRef.componentInstance.action = this.languageService.getI18n('button.delete');
    modalRef.componentInstance.value = name;

    modalRef.result.then((result) => {
      result ? this.delete(id) : null;
    });

  }

  delete(id: string) {

    this.itemService.delete(id).subscribe(response => {

      if (response.status) {
        this.notificationService.success(response.message);
        this.getItems();
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  print() {
    // this.notificationService.error(this.languageService.getI18n('no.printer'));
    // let divToPrint = document.getElementById('print-index-invoice');
    // var newWin = window.open('', 'Print-Window');
    // newWin.document.open();
    // newWin.document.write('<html><link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css" media="print"/><body onload="window.print()">' + 'HI' + '</body></html>');
    // newWin.document.close();
    // setTimeout(function () {
    //   newWin.close();
    // }, 10000);
    window.print();
  }

  modalPrint(name: string, price: number, barcode: string) {

    if(!barcode){
      this.notificationService.error('Barcode not found.');
      return;
    }

    const modalRef = this.modalService.open(BarcodePrintModalComponent, { centered: true, backdrop: 'static'});
    // size: 'lg' 

    modalRef.componentInstance.name = name;
    modalRef.componentInstance.price = price;
    modalRef.componentInstance.barcode = barcode;

  }

}
