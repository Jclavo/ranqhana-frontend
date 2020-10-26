export class InvoiceStage {

    id: string = '';
    name: string = '';

    static getForPaid(){
        return 1;
    }

    static getForAnnulled(){
        return 2;
    }

    static getForDraft(){
        return 3;
    }

    static getForByInstallment(){
        return 4;
    }

    static getForStockUpdated(){
        return 5;
    }

}