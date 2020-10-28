import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

//MODELS
import { Item } from "@modules/items/models";
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
import { ImageModalComponent } from "@modules/utility/components/image-modal/image-modal.component";
import { ConfirmModalComponent } from '@modules/utility/components';

@Component({
  selector: 'sb-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  public service = new Item();

  public units: Array<Unit> = [];
  public stockTypes: Array<StockType> = [];

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

    this.getUnits();
    this.getStockTypes();

    this.service.id = this.activatedRoute.snapshot.paramMap.get('id') ? Number(this.activatedRoute.snapshot.paramMap.get('id')) : 0;
    this.service.id ? this.getById(this.service.id) : null;
  }
  
  getById(id: number)
  {
    this.itemService.getById(id).subscribe(response => {

      if (response.status) {
        this.service = response.result;

        //logic to check as true the stock types selected
        for (let i = 0; i < this.service.stock_types.length; i++) {
            for (let j = 0; j < this.stockTypes.length; j++) {
              if(this.service.stock_types[i] == this.stockTypes[j].id){
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

    this.service.stock_types = this.getStockTypesChoosen(); // get stock types selected

    if(this.service.stock_types.length == 0){
      this.notificationService.error(this.languageService.getI18n('item.emptyStockType'));
      return;
    }

    if(this.service.id){
      this.update(this.service);
    }
    else{
      this.service.store_id = this.authService.getUserStoreID();
      this.create(this.service);
    }

  }

  create(service: Item) {
    this.itemService.createService(service).subscribe(response => {

      if (response.status) {
        this.notificationService.success(response.message);

        this.service.id = response.result.id;
         //save images
         this.saveArrayImages();

         //return
        this.router.navigate(['/items/services']);
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  update(service: Item)
  {
    this.itemService.updateService(service).subscribe(response => {

      if (response.status) {
        this.notificationService.success(response.message);

        //save images
        this.saveArrayImages();

        //return
        this.router.navigate(['/items/services']);
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  saveArrayImages(){

    for (let index = 0; index < this.service.images.length; index++) {
      
      let newImage = new Image();
      newImage.name = this.service.images[index].name;
      newImage.model_id = this.service.id;
      newImage.model = "ITEM";
      this.saveImage(newImage);
      
    }
  }

  saveImage(image: Image) {

    this.imageService.save(image).subscribe(response => {

      if (response.status) {
        // this.notificationService.success(response.message);
        console.log(response.message);
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  getUnits(){

    this.unitService.get().subscribe(response => {

      if (response.status) {
        this.units = response.result;
      }else{
        this.notificationService.error(response.message);
      }
    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  getStockTypes(){

    this.stockTypesService.get().subscribe(response => {

      if (response.status) {
        this.stockTypes = response.result;
      }else{
        this.notificationService.error(response.message);
      }
    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  getStockTypesChoosen(){

    let stockTypes: Array<StockType> = [];
    stockTypes = this.stockTypes.filter(function(value) {
      return value.checked == true;
    });

    return stockTypes.map(function(value) {
      return value.id;
    });

  }

  openImageModal() {
    
    const modalRef = this.ngbModal.open(ImageModalComponent, { centered: true, backdrop: 'static' });

    modalRef.result.then((result) => {
      console.log(result);
      if(result.status){
        let newImage = new Image();
        newImage.name = result.image;
        this.service.images.push(newImage);
      }

    });
  }


  modalDelete(id: string, name: string) {
    
    const modalRef = this.ngbModal.open(ConfirmModalComponent, { centered: true, backdrop: 'static' });

    modalRef.componentInstance.title = this.languageService.getI18n('product.page.title');
    modalRef.componentInstance.action = this.languageService.getI18n('button.delete');
    modalRef.componentInstance.value = name;

    modalRef.result.then((result) => {
      if(result){
        if(parseInt(id) > 0){
          this.deleteImage(id);
        }else{
          this.service.images =  this.service.images.filter(function(image: Image) {
            return image.name != name;
          });

        }
      }
       
    });

  }

  deleteImage(id: string){

    this.imageService.delete(id).subscribe(response => {

      if (response.status) {
        this.notificationService.success(response.message);

        this.getById(this.service.id);
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
