export class Payment {
    id: number = 0;
    amount: number = 0;
    money: number = 0;
    payment_date: string = '';
    real_payment_date: string = '';
    invoice_id: number = 0;
    payment_method_id: number = 0;
    payment_stage_id: number = 0;

    //extra
    change : number = 0;
    transaction_code: string = '';
    payment_method_name: string = '';
    payment_stage_name: string = '';
}