import { Invoice } from "./invoice.model";
import { InvoiceType } from "@modules/invoice-types/models";

export class PurchaseInvoice extends Invoice {

    constructor(){
        super();
        this.type_id = InvoiceType.getForPurchase();
    }
     
}