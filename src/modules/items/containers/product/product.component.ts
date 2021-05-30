import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

//MODELS
import { Item, SearchItemOptions, ItemTag, ItemRoot } from "@modules/items/models";
import { Unit } from "@modules/units/models";
import { StockType } from "@modules/stock-types/models";
import { Image } from "@modules/utility/models";

//SERVICES
import { ItemService } from "../../services";
import { NotificationService, LanguageService, ImageService } from '@modules/utility/services';
import { AuthService } from '@modules/auth/services';
import { UnitService } from '@modules/units/services';
import { StockTypesService } from '@modules/stock-types/services';

// COMPONENT 
import { ImageModalComponent, ConfirmModalComponent } from "@modules/utility/components";
import { ShowPricesComponent } from '@modules/prices/components';

@Component({
  selector: 'sb-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public product = new Item();
  public itemRoot = new Item();
  public itemRootAmount: number = 0;

  public units: Array<Unit> = [];
  public unitsBasic: Array<Unit> = [];
  public stockTypes: Array<StockType> = [];
  public images: Array<Image> = [];
  public items: Array<Item> = [];

  constructor(
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    public authService: AuthService,
    private unitService: UnitService,
    private stockTypesService: StockTypesService,
    private languageService: LanguageService,
    private ngbModal: NgbModal,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {

    this.getStockTypes();
    this.getUnits();

    this.product.id = this.activatedRoute.snapshot.paramMap.get('id') ? Number(this.activatedRoute.snapshot.paramMap.get('id')) : 0;
    this.product.id ? this.getById(this.product.id) : null;
  }

  formatter = (item: Item) => item.name;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(searchValue =>
        this.getItems(searchValue)
      )
    )

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
        //logic to get roots
        if (this.product.roots.length > 0) {
          
          this.itemRootAmount = this.product.roots[0].amount;
          this.itemRoot = this.product.roots[0].item;
          this.product.isContainer = true
          this.onContainer();
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

    // validate stock types
    if (this.product.stock_types.length == 0) {
      this.notificationService.error(this.languageService.getI18n('item.emptyStockType'));
      return;
    }

    // validate mandatory field if product is container
    if (this.product.isContainer) {

      // valition for root item
      if (this.itemRoot.id == 0) {
        this.notificationService.error(this.languageService.getI18n('item.emptyRootItem'));
        return;
      }

      //validation for amount
      if (this.itemRootAmount == 0) {
        this.notificationService.error(this.languageService.getI18n('item.emptyAmount'));
        return;
      }
    }

    //set tag type
    if (this.product.isContainer) {
      this.product.tag_id = ItemTag.getForContainer();
      this.product.name = this.itemRoot.name + " - " + this.getUnitNameById(this.product.unit_id).toLowerCase();
    } else {
      this.product.tag_id = ItemTag.getForItem();
    }

    if (this.product.id) {
      this.update(this.product);
    }
    else {
      this.product.store_id = this.authService.getCompanyID();
      this.create(this.product);
    }

  }

  create(product: Item) {
    this.itemService.createProduct(product).subscribe(response => {

      if (response.status) {
        this.notificationService.success(response.message);

        this.product.id = response.result.id;

        //save images
        this.saveArrayImages();

        if (this.product.tag_id == ItemTag.getForContainer()) {
          this.saveItemChild(this.product.id, this.itemRoot.id, this.itemRootAmount);
        }

        //return
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

        //save images
        this.saveArrayImages();

        if (this.product.tag_id == ItemTag.getForContainer()) {
          this.saveItemChild(this.product.id, this.itemRoot.id, this.itemRootAmount);
        }

        //return
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

  saveArrayImages() {

    for (let index = 0; index < this.product.images.length; index++) {

      let newImage = new Image();
      newImage.name = this.product.images[index].name;
      newImage.model_id = this.product.id;
      newImage.model = "ITEM";
      this.saveImage(newImage);

    }
  }

  saveImage(image: Image) {

    this.imageService.save(image).subscribe(response => {

      if (response.status) {
        // this.notificationService.success(response.message);
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

  async getStockTypes() {

    await this.stockTypesService.get().toPromise().then(response => {

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

    let stockTypes: Array<StockType> = [];
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
      if (result.status) {
        let newImage = new Image();
        newImage.name = result.image;
        this.product.images.push(newImage);
      }

    });
  }


  modalDelete(id: string, name: string) {

    const modalRef = this.ngbModal.open(ConfirmModalComponent, { centered: true, backdrop: 'static' });

    modalRef.componentInstance.title = this.languageService.getI18n('product.page.title');
    modalRef.componentInstance.action = this.languageService.getI18n('button.delete');
    modalRef.componentInstance.value = name;

    modalRef.result.then((result) => {
      if (result) {
        if (parseInt(id) > 0) {
          this.deleteImage(id);
        } else {
          this.product.images = this.product.images.filter(function (image: Image) {
            return image.name != name;
          });

        }
      }
    });

  }

  deleteImage(id: string) {

    this.imageService.delete(id).subscribe(response => {

      if (response.status) {
        this.notificationService.success(response.message);

        this.getById(this.product.id);
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });

  }

  openPricesModal(item_id: number) {

    const modalRef = this.ngbModal.open(ShowPricesComponent, { centered: true, backdrop: 'static' });

    modalRef.componentInstance.item_id = item_id;

  }

  onContainer() {

    if (this.product.isContainer) {
      this.units = this.units.filter(function (value) {
        return value.isBasic == false;
      });

      if (this.product.id == 0) {
        this.product.unit_id = -1;
      }
      
    } else {
      this.getUnits();
    }

  }

  getItems(searchValue: string) {

    let searchItemOptions = new SearchItemOptions();
    searchItemOptions.searchValue = searchValue; // Assign value to search
    searchItemOptions.barcode = false; // Assign value to search
    searchItemOptions.stock_type_id = StockType.getForSell();

    return this.itemService.get(searchItemOptions).pipe(
      map(response => {

        if (response.status) {
          this.items = response.result;
          return this.items;
        } else {
          this.notificationService.error(response.message);
          return []
        }
      }, (error: any) => {
        this.notificationService.error(error);
        this.authService.raiseError();
      }))
  }

  getUnitNameById(unit_id: number) {
    for (let index = 0; index < this.units.length; index++) {
      if (unit_id == this.units[index].id) {
        return this.units[index].name
      }
    }
    return ""
  }

  saveItemChild(item_id: number, root_id: number, amount: number) {

    let itemChild = new ItemRoot();

    itemChild.item_id = item_id;
    itemChild.root_id = root_id;
    itemChild.amount = amount;

    this.itemService.saveItemChild(itemChild).subscribe(response => {

      if (response.status) {
        // this.notificationService.success(response.message);
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
