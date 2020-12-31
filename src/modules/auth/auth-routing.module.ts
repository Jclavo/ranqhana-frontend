/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { AuthModule } from './auth.module';

/* Containers */
import * as authContainers from './containers';

/* Guards */
// import * as authGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    // {
    //     path: '',
    //     pathMatch: 'full',
    //     redirectTo: 'login',
    // },
    {
        path: '',
        canActivate: [],
        component: authContainers.LoginComponent,
        data: {
            title: 'login.pagetitle',
        } as SBRouteData,
    },
    {
        path: 'register',
        canActivate: [],
        component: authContainers.RegisterComponent,
        data: {
            title: 'Pages Register - Store App',
        } as SBRouteData,
    },
    {
        path: 'register/:store_id',
        canActivate: [],
        component: authContainers.RegisterComponent,
        data: {
            title: 'Pages Register - Store App',
        } as SBRouteData,
    },
    {
        path: 'forgot-password',
        canActivate: [],
        component: authContainers.ForgotPasswordComponent,
        data: {
            title: 'Pages Forgot Password - Store App',
        } as SBRouteData,
    },
    {
        path: 'home',
        canActivate: [],
        component: authContainers.HomeComponent,
        data: {
            title: 'Home - Store App',
        } as SBRouteData,
    },
];

@NgModule({
    imports: [AuthModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
