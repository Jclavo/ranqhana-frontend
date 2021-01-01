import { Payment } from "@modules/payments/models";
import { Order } from "@modules/orders/models";
import { InvoiceDetail } from "../models";

export class Invoice {
    // [key: string]: string | number;
    id: number = 0;
    serie: string = '';
    subtotal: number = 0.0;
    taxes: number = 0.0;
    discount: number = 0.0;
    total: number = 0.0;
    type_id: number = 0;
    type: string = '';
    stage_id: number = 0;
    stage: string = '';
    user_id: number = 0;
    external_user_id: number = 0;
    external_user: string = '';
    created_at: string = '';
    store: string = '';
    payment_type_id: number = 0;
    order_id: number = 0;

    payments: Array<Payment> = [];
    order = new Order();
    details: Array<InvoiceDetail> = [];

    getType(){
        return this.type_id;
    }


    
}