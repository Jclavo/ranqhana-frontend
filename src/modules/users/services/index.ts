import { UserService } from './user.service';
import { PersonService } from './person.service';

export const services = [UserService, PersonService ];

export * from './user.service';
export * from './person.service';