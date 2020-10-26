export class Order {
    id: number = 0;
    serie: string = '';
    invoice_id: number = 0;
    stage_id: number = 0;
    stage_name: string = '';
    invoice_type_id: number = 0;
    invoice_type_name: string = '';
    invoice_stage_name: string = '';
    delivery_date: string = '';
    created_at: string = '';

    static getModelName(){
        return 'ORDER';
    }
}