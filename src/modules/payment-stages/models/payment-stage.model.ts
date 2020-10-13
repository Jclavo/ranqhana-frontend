export class PaymentStage {
    id: number = 0;
    name: string = '';

    static getStageWaiting(){
        return 1;
    }

    static getStageDelayed(){
        return 2;
    }

    static getStagePaid(){
        return 3;
    }

    static getStageAnulled(){
        return 4;
    }

}