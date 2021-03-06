import { SearchOptions } from "@modules/utility/models";

export class SearchUserOptions extends SearchOptions {

    company_id: number = 0;
    project_id: number = 0;
    role_id: number = 0;
    identification: string = '';
    type_id: number = 0;
    country_code: string = '';

    constructor() {
        super();
    }

}