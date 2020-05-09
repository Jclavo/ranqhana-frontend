import { SearchOptions } from "@modules/utility/models";

export class SearchInvoice extends SearchOptions {

    fromDate: string = '';
    toDate: string = '';
    type_id: number = 1;
    searchBy: string = 'H';

    constructor() {
        super();
    }
}