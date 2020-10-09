export class PaymentType {
    id: string = '';
    name: string = '';


    static getTypeDebit(){
        return 1;
    }

    static getTypeCredit(){
        return 2;
    }
}