import { SearchOptions } from "@modules/utility/models";

export class SearchInvoice extends SearchOptions {

    fromDate: string = '';
    toDate: string = '';
    type_id: number = 0;
    searchBy: string = 'H';

    constructor() {
        super();
    }
}