export class StockTypes {
    id: number = 0;
    name: string = '';
    checked: boolean = false;

    getTypeForSell(){
        return 1;
    }

    getTypeForPurchase(){
        return 2;
    }
}