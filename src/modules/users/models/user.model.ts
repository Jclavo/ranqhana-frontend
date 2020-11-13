import { PersonType } from '@modules/person-types/models';

export class User {

    id: number = 0;
    login: string = '';
    api_token: string = '';
    password: string = '';
    repassword: string = '';

    //user info
    identification: string = '';
    name: string = '';
    lastname: string = '';
    email: string = '';
    phone: string = '';
    address: string = '';
   
    //company info
    company_id: number = 0;
    company: string = '';

    //project info
    project_id: number = 0;
    project: string = '';

    //country info
    country_id: number = 0;
    country: string = '';
    countryCode: string = '';
    currency: string = '';
    locale: string = '';
    tax: number = 0;

    //FK
    company_project_id: number = 0;
    universal_person_id: number = 0;

    //roles
    rolesID: Array<string> = [];
    roles: Array<string> = [];

    // type
    type_id: number = 0;
    type: string = '';
}