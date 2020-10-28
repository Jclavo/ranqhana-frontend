export class PaymentStage {
    id: number = 0;
    name: string = '';

    static getForWaiting(){
        return 1;
    }

    static getForDelayed(){
        return 2;
    }

    static getForPaid(){
        return 3;
    }

    static getForAnulled(){
        return 4;
    }

}