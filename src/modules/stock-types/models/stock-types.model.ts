export class StockTypes {
    id: number = 0;
    name: string = '';
    checked: boolean = false;

    static getTypeForSell(){
        return 1;
    }

    static getTypeForPurchase(){
        return 2;
    }
}