import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//MODELS
import { Unit,  } from "../../models";

//SERVICES
import { NotificationService } from '@modules/utility/services';
import { AuthService } from "@modules/auth/services";
import { UnitService } from '../../services';

@Component({
  selector: 'sb-unit-modal',
  templateUrl: './unit-modal.component.html',
  styleUrls: ['./unit-modal.component.scss']
})
export class UnitModalComponent implements OnInit {

  @Input() unit_id: string = "";

  public unit = new Unit();
  
  constructor(
    public activeModal: NgbActiveModal,
    public notificationService: NotificationService,
    public unitService: UnitService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    
    if(this.unit_id){
      this.unit.id = this.unit_id;
      this.getById(this.unit.id);
    }
  } 

  save(){
    this.unit.id ? this.update(this.unit) : this.create(this.unit);
  }

  create(unit: Unit) {
    this.unitService.create(unit).subscribe(response => {

      if (response.status) {
        this.notificationService.success(response.message);
        this.activeModal.close(true);
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  update(unit: Unit)
  {
    this.unitService.update(unit).subscribe(response => {

      if (response.status) {
        this.notificationService.success(response.message);
        this.activeModal.close(true);
      }
      else {
        this.notificationService.error(response.message);
      }

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

  getById(id: string)
  {
    this.unitService.getById(id).subscribe(response => {

      response.status ? this.unit = response.result : this.notificationService.error(response.message);

    }, error => {
      this.notificationService.error(error);
      this.authService.raiseError();
    });
  }

}
