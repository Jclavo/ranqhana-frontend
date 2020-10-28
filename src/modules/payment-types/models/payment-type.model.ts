export class PaymentType {
    id: string = '';
    name: string = '';


    static getForDebit(){
        return 1;
    }

    static getForCredit(){
        return 2;
    }
}