export class OrderStage {
    id: number = 0;
    name: string = ''; 


    static getStageNew(){
        return 1;
    }
    static getStageRequested(){
        return 2;
    }
    static getStageAccepted(){
        return 3;
    }
    static getStagePreparing(){
        return 4;
    }
    static getStageWrapped(){
        return 5;
    }
    static getStageReady(){
        return 6;
    }
    static getStageShipped(){
        return 7;
    }
    static getStageDelivered(){
        return 8;
    }
    static getStageCanceled(){
        return 9;
    }
    static getStageAutomatic(){
        return 10;
    }
}