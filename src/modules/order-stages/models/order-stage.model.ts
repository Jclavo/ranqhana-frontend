export class OrderStage {
    id: number = 0;
    name: string = ''; 


    static getForNew(){
        return 1;
    }
    static getForRequested(){
        return 2;
    }
    static getForAccepted(){
        return 3;
    }
    static getForPreparing(){
        return 4;
    }
    static getForWrapped(){
        return 5;
    }
    static getForReady(){
        return 6;
    }
    static getForShipped(){
        return 7;
    }
    static getForDelivered(){
        return 8;
    }
    static getForCanceled(){
        return 9;
    }
    static getForAutomatic(){
        return 10;
    }
}