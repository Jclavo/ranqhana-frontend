export class InvoiceDetail {
    id: number = 0;
    item_id: number = 0;
    item: string = '';
    unit: string = '';
    quantity:  number = 0.0;
    price: number = 0.0;
    total: number = 0.0;   
    invoice_id: number = 0;
    barcode: string = '';

    //extra
    type_id: number = 0;
}