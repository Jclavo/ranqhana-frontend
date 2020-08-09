import { SearchOptions } from "@modules/utility/models";

export class SearchItemOptions extends SearchOptions {

    stock_type_id: number = 0;
    type_id: number = 0;

    constructor() {
        super();
    }

}