export class Invoice {
    // [key: string]: string | number;
    id: number = 0;
    serie: string = '';
    subtotal: number = 0.0;
    taxes: number = 0.0;
    discount: number = 0.0;
    total: number = 0.0;
    type_id: number = 0;
    stage: string = '';
    user_id: number = 0;
    external_user_id: number = 0;
    created_at: string = '';

    setTypeForSell(){
        this.type_id = 1;
    }

    setTypeForPurchase(){
        this.type_id = 2;
    }
    
}