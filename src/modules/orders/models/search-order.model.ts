import { SearchOptions } from "@modules/utility/models";

export class SearchOrder extends SearchOptions {

    fromDate: string = '';
    toDate: string = '';
    type_id: number = 0;
    stage_id: number = 0;
    serie: string = '';

    constructor() {
        super();
    }
}