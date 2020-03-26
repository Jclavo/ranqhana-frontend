import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//MODELS
import { SellInvoice } from "../../models";

@Component({
  selector: 'sb-add-aditional-info',
  templateUrl: './add-aditional-info.component.html',
  styleUrls: ['./add-aditional-info.component.scss']
})
export class AddAditionalInfoComponent implements OnInit {

  @Input() invoice_id: string = "12345";

  public invoice = new SellInvoice();
  
  constructor(
    public activeModal: NgbActiveModal,
  ) { }
 
  ngOnInit(): void {
  }

  save(){
    this.activeModal.close(false);
  }

}
