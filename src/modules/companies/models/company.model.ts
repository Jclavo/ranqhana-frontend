import { CompanySetting } from '@modules/companies/models';
import { Person } from '@modules/persons/models';

export class Company {
  
    id: number = 0;
    universal_person_id : number = 0;
    
    setting = new CompanySetting();

    person = new Person();
}