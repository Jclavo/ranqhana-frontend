import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//MODELS
import { BarcodePrintConfiguration } from '@modules/utility/models';

// //SERVICES
// import { OrderService } from "@modules/orders/services";
// import { PaymentService } from "@modules/payments/services";
import { AuthService } from '@modules/auth/services';
// import { NotificationService, CustomDateService, LanguageService } from '@modules/utility/services';

@Component({
  selector: 'sb-barcode-print-modal',
  templateUrl: './barcode-print-modal.component.html',
  styleUrls: ['./barcode-print-modal.component.scss']
})
export class BarcodePrintModalComponent implements OnInit {

  @Input() name: string = '';
  @Input() price: number = 0;
  @Input() barcode: string = '';

  public divWidth: string = '25mm';
  public divHeight: string = '25mm';
  public divQuantity: number = 0;

  public barcodeWidth: number = 1;
  public barcodeHeight: number = 20;

  public fontSize: string = '10px';

  public configurations: Array<BarcodePrintConfiguration> = [] 
  public configuration = new BarcodePrintConfiguration('50mm','50mm',0,2,50,'20px');
  public configurationID: string = '';
  
  constructor(
    public activeModal: NgbActiveModal,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.loadBarcodePrintConfiguration();
  }

  loadBarcodePrintConfiguration(){

    // _divWidth: string, _divHeight: string, _divQuantity: number,
    // _barcodeWidth: number, _barcodeHeight: number, _fontSize: string

    this.configurations.push(
      new BarcodePrintConfiguration('100mm','150mm',0,5,200,'40px')
    );

    this.configurations.push(
      new BarcodePrintConfiguration('100mm','100mm',0,4,150,'30px')
    );

    this.configurations.push(
      new BarcodePrintConfiguration('100mm','50mm',0,4,60,'20px')
    );

    this.configurations.push(
      new BarcodePrintConfiguration('100mm','40mm',0,3,50,'15px')
    );

    this.configurations.push(
      new BarcodePrintConfiguration('75mm','75mm',0,3,100,'25px')
    );

    this.configurations.push(
      new BarcodePrintConfiguration('75mm','75mm',0,3,100,'25px')
    );

    this.configurations.push(
      new BarcodePrintConfiguration('50mm','50mm',0,2,50,'20px')
    );

    this.configurations.push(
      new BarcodePrintConfiguration('25mm','25mm',0,1,20,'10px')
    );

  }

  onConfiguration(){

    for (let index = 0; index < this.configurations.length; index++) {
      if(this.configurations[index].id == this.configurationID){
        this.configuration = this.configurations[index];
      }
    }
  }

  print(){
    
  }

}

// 200 X 200 = 9 X 300 = 90
 
// 100 X 150 = 5 X 200 = 40 

// 100 X 100 = 4 X 150 = 30

// 100 X 50 = 4 X 60 = 20

// 100 X 40 = 3 X 50 = 15 / 20 

// 75 X 75 = 3 X 100 = 25 px

// 50 X 50 = 2 X 50 = 20

// 50 X 25 = 1 X 30 / 25 = error

// 34 X 20 = 1 X 20 = error

// 25 X 25 = 1 X 20 = 10
