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
    stage: string = '';
    user_id: number = 0;
    external_user_id: number = 0;
    external_user: string = '';
    created_at: string = '';
    store: string = '';
    payment_type_id: number = 0;

    getType(){
        return this.type_id;
    }
    
}