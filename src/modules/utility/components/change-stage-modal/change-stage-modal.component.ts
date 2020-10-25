import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//MODELS
import { Stage } from "../../models";
import { Response } from '@modules/utility/models';
import { Order } from '@modules/orders/models';

//SERVICES
import { OrderStageService } from "@modules/order-stages/services";
import { OrderService } from "@modules/orders/services";
import { AuthService } from '@modules/auth/services';
import { NotificationService } from '@modules/utility/services';

@Component({
  selector: 'sb-change-stage-modal',
  templateUrl: './change-stage-modal.component.html',
  styleUrls: ['./change-stage-modal.component.scss']
})
export class ChangeStageModalComponent implements OnInit {

  @Input() model: string = '';
  @Input() model_id: number = 0;
  @Input() stage_id: number = 0;

  public stages: Array<Stage> = [];
  public modalResponse = new Response();

  constructor(
    public activeModal: NgbActiveModal,
    private orderStageService: OrderStageService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {

    this.orderStageService.getAll().subscribe(response => {

      if (response.status) {
        this.stages = response.result;
      } else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });

  }

  change() {
    switch (this.model) {
      case Order.getModelName():
        let order = new Order();
        order.id = this.model_id;
        order.stage_id = this.stage_id;
        this.changeOrderStage(order);
        break;

      default:
        break;
    }
  }

  changeOrderStage(order: Order) {
    this.orderService.updateStage(order).subscribe(async response => {

      if (response.status) {
        this.notificationService.success(response.message);

        this.modalResponse.status = true;
        this.activeModal.close(this.modalResponse);

      } else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }


}
