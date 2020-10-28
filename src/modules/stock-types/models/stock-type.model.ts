export class StockType {
    id: number = 0;
    code: number = 0;
    name: string = '';
    checked: boolean = false;

    static getForSell(){
        return 1;
    }

    static getForPurchase(){
        return 2;
    }
}