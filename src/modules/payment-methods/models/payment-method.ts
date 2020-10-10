export class PaymentMethod {
    id: string = '';
    name: string = '';

    static getMethodMoney(){
        return 1;
    }

    static getMethodCard(){
        return 2;
    }
}