export class PaymentType {
    id: number = 0;
    name: string = '';

    static getForDebit(){
        return 1;
    }

    static getForCredit(){
        return 2;
    }

    static getForCash(){
        return 3;
    }

    static getForInternalCredit(){
        return 4;
    }
}