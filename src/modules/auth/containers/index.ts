import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

export const containers = [LoginComponent, RegisterComponent, ForgotPasswordComponent,
                           HomeComponent, ChangePasswordComponent];

export * from './login/login.component';
export * from './register/register.component';
export * from './forgot-password/forgot-password.component';
export * from './home/home.component';
export * from './change-password/change-password.component';
