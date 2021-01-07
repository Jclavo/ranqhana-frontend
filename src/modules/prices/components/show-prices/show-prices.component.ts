import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//MODELS
import { Price } from "../../models";

//SERVICES
import { PriceService } from "../../services";
import { AuthService } from "@modules/auth/services";
import { NotificationService, UtilityService, LanguageService } from '@modules/utility/services';


@Component({
  selector: 'sb-show-prices',
  templateUrl: './show-prices.component.html',
  styleUrls: ['./show-prices.component.scss']
})
export class ShowPricesComponent implements OnInit {

  public sellingPrices: Array<Price> = [];
  public purchasingPrices: Array<Price> = [];

  @Input() item_id: number = 0;

  constructor(
    public activeModal: NgbActiveModal,
    private notificationService: NotificationService,
    private authService: AuthService,
    private utilityService: UtilityService,
    private languageService: LanguageService,
    private priceService: PriceService
  ) {

  }

  ngOnInit(): void {
    this.getPurchasePriceByItem(this.item_id);
    this.getSellPriceByItem(this.item_id);

  }

  getSellPriceByItem(item_id: number) {

    this.priceService.getSellPriceByItem(item_id).subscribe(response => {

      if (response.status) {
        this.sellingPrices = response.result;
      } else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });

  }

  getPurchasePriceByItem(item_id: number) {

    this.priceService.getPurchasePriceByItem(item_id).subscribe(response => {

      if (response.status) {
        this.purchasingPrices = response.result;
      } else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });

  }

}
