import { Invoice } from "./invoice.model";
import { InvoiceType } from "@modules/invoice-types/models";

export class SellInvoice extends Invoice {

    constructor(){
        super();
        this.type_id = InvoiceType.getForSell();
    }
     
}