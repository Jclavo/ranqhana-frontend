export class PaymentMethod {
    id: number = 0;
    name: string = '';

    static getForMoney(){
        return 1;
    }

    static getForCard(){
        return 2;
    }
}