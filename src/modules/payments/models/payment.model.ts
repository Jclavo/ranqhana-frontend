import { PaymentType } from "@modules/payment-types/models";

export class Payment {
    id: number = 0;
    amount: number = 0;
    money: number = 0;
    payment_date: string = '';
    real_payment_date: string = '';
    invoice_id: number = 0;
    method_id: number = 0;
    stage_id: number = 0;

    //extra
    change : number = 0;
    transaction_code: string = '';
    method: string = '';
    stage: string = '';

    type = new PaymentType();

    static getModelName(){
        return 'PAYMENT';
    }
}