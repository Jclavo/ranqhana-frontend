import { UserService } from './user.service';
import { UserDetailsService } from './user-details.service';

export const services = [UserService, UserDetailsService ];

export * from './user.service';
export * from './user-details.service';