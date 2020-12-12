import { PersonType } from '@modules/person-types/models';
import { Person } from '@modules/persons/models';
import { Country } from '@modules/country/models';


export class User {

    id: number = 0;
    login: string = '';
    api_token: string = '';
    password: string = '';
    repassword: string = '';
    
    //FK
    universal_person_id: number = 0;
    company_project_id: number = 0;

    //user info
    person = new Person();

    // type
    type = new PersonType();
    // type_id: number = 0;
    // type: string = '';

    //country info
    country = new Country();

    //company info
    company_id: number = 0;
    company: string = '';

    //project info
    project_id: number = 0;
    project: string = '';

    //roles
    rolesID: Array<string> = [];
    roles: Array<string> = [];

}