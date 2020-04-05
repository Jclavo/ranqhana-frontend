export class Invoice {
    [key: string]: string | number;
    id: string = '';
    serie: string = '';
    subtotal: number = 0.0;
    taxes: number = 0.0;
    discount: number = 0.0;
    total: number = 0.0;
    client: string = '';  
    created_at: string = '';       
}