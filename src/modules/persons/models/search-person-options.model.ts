import { SearchOptions } from "@modules/utility/models";

export class SearchPersonOptions extends SearchOptions {

    identification: string = '';
    type_id: number = 0;
    country_code: number = 0;

    constructor() {
        super();
    }

}