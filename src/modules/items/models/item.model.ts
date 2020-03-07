export class Item {
    [key: string]: string | number;
    id: any;
    name: string = '';
    description: string = '';
    quantity: number = 0;
    store_id: number = 0;
    created_at: string = ''; 
    updated_at: string = '';    
}