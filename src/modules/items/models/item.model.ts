export class Item {
    // [key: string]: string | number | boolean;
    id: number = 0;
    name: string = '';
    description: string = '';
    price: number = 0;
    stock: number = 0;
    unit: string = '';
    unit_id: number = 0;
    fractioned: boolean = false; 
    stocked: boolean = true; 
    store_id: number = 0;
    created_at: string = ''; 
    updated_at: string = ''; 

    stocks: Array<number|string> = [];
    
    //extra fields
    quantity: number = 0;
}