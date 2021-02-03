import { Country } from "@modules/country/models";
import { PersonType } from "@modules/person-types/models";
import { Image } from "@modules/utility/models";
import { CompanySetting } from "@modules/companies/models";

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
    belongs: boolean = false;

    type = new PersonType();
    country = new Country();
    
    image = new Image();
    images: Array<Image> = [];

    company_project: Array<CompanySetting> = [];
}