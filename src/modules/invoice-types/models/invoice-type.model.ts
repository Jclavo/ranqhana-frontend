export class InvoiceType {
    
    id: string = '';
    name: string = ''; 
    
    static getForSell(){
        return 1;
    }

    static getForPurchase(){
        return 2;
    }
}