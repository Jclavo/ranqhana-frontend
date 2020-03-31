import { SearchOptions } from "@modules/utility/models";

export class SearchInvoice extends SearchOptions {


    fromDate: string = "";
    toDate: string = "";

    constructor() {
        super();
        this.fromDate = this.getCurrentDate();
        this.toDate = this.getCurrentDate();
    }

    getCurrentDate() {
        return new Date().getFullYear() + "-" +
            (((new Date().getMonth() + 1) < 10) ? "0" : "") + (new Date().getMonth() + 1) + "-" +
            ((new Date().getDate() < 10) ? "0" : "") + new Date().getDate() ;
    }


}