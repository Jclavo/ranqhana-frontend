export class Service {
    id: number = 0; 
    name: string = '';
    description: string = '';
    price: number = 0;
    created_at: string = ''; 
    updated_at: string = ''; 

    stock_types: Array<number|string> = [];
}