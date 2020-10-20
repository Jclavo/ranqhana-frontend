import { Invoice } from "./Invoice.model";
// import { Invoice } from "./Invoice.model";
export class SellInvoice extends Invoice {

    constructor(){
        super();
        this.type_id = 1;
    }
     
}