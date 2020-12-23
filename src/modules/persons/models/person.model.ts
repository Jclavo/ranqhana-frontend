import { Country } from "@modules/country/models";
import { PersonType } from "@modules/person-types/models";

export class Person {
    id: number = 0
    identification: string = '';
    email: string = '';
    name: string = '';
    lastname: string = '';
    phone: string = '';
    address: string = '';

    country_code: string = '';
    type_id: number = 0

    type = new PersonType();
    country = new Country();
}