export class Item {
    [key: string]: string | number | boolean;
    id: any;
    name: string = '';
    description: string = '';
    price: number = 0;
    stock: number = 0;
    unit: string = '';
    stocked: boolean = true; 
    store_id: number = 0;
    created_at: string = ''; 
    updated_at: string = '';    
}