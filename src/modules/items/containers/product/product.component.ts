import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

//MODELS
import { Item } from "@modules/items/models";
import { Unit } from "@modules/units/models";
import { StockTypes } from "@modules/stock-types/models";

//SERVICES
import { ItemService } from "../../services";
import { NotificationService, LanguageService } from '@modules/utility/services';
import { AuthService } from '@modules/auth/services';
import { UnitService } from '@modules/units/services';
import { StockTypesService } from '@modules/stock-types/services';

// COMPONENT 
import { ImageModalComponent } from "@modules/utility/components/image-modal/image-modal.component";

@Component({
  selector: 'sb-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public product = new Item();

  public units: Array<Unit> = [];
  public stockTypes: Array<StockTypes> = [];

  constructor(
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private authService: AuthService,
    private unitService: UnitService,
    private stockTypesService: StockTypesService,
    private languageService: LanguageService,
    private ngbModal: NgbModal,
  ) { }

  ngOnInit(): void {

    this.getUnits();
    this.getStockTypes();

    this.product.id = this.activatedRoute.snapshot.paramMap.get('id') ? Number(this.activatedRoute.snapshot.paramMap.get('id')) : 0;
    this.product.id ? this.getById(this.product.id) : null;
  }

  getById(id: number) {
    this.itemService.getById(id).subscribe(response => {

      if (response.status) {
        this.product = response.result;

        //logic to check as true the stock types selected
        for (let i = 0; i < this.product.stock_types.length; i++) {
          for (let j = 0; j < this.stockTypes.length; j++) {
            if (this.product.stock_types[i] == this.stockTypes[j].id) {
              this.stockTypes[j].checked = true;
              break;
            }
          }
        }
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  save() {

    this.product.stock_types = this.getStockTypesChoosen(); // get stock types selected

    if (this.product.stock_types.length == 0) {
      this.notificationService.error(this.languageService.getI18n('item.emptyStockType'));
      return;
    }

    if (this.product.id) {
      this.update(this.product);
    }
    else {
      this.product.store_id = this.authService.getUserStoreID();
      this.create(this.product);
    }

  }

  create(product: Item) {
    this.itemService.createProduct(product).subscribe(response => {

      if (response.status) {
        this.notificationService.success(response.message);
        this.router.navigate(['/items/products']);
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  update(product: Item) {
    this.itemService.updateProduct(product).subscribe(response => {

      if (response.status) {
        this.notificationService.success(response.message);
        this.router.navigate(['/items/products']);
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  getUnits() {

    this.unitService.get().subscribe(response => {

      if (response.status) {
        this.units = response.result;
      } else {
        this.notificationService.error(response.message);
      }
    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  getStockTypes() {

    this.stockTypesService.get().subscribe(response => {

      if (response.status) {
        this.stockTypes = response.result;
      } else {
        this.notificationService.error(response.message);
      }
    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  getStockTypesChoosen() {

    let stockTypes: Array<StockTypes> = [];
    stockTypes = this.stockTypes.filter(function (value) {
      return value.checked == true;
    });

    return stockTypes.map(function (value) {
      return value.id;
    });

  }


  openImageModal() {
    
    const modalRef = this.ngbModal.open(ImageModalComponent, { centered: true, backdrop: 'static' });

    modalRef.result.then((result) => {
      console.log(result);

    });
  }

}
