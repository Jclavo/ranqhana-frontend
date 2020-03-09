import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

//MODEL
import { User } from '../models';

@Injectable()
export class AuthService {

    private api_token: string = '';
    public user = new User();

    constructor() { }

    public setUser(userInfo: User) {

        this.setAPITOKEN(userInfo.api_token);
        // this.api_token = userInfo.api_token;

        this.user.id = userInfo.id;
        this.user.name = userInfo.name;
        this.user.email = userInfo.email;
        this.user.identification = userInfo.identification;
        this.user.country_code = userInfo.country_code;
        this.user.store_id = userInfo.store_id;

        localStorage.setItem('user', JSON.stringify(this.user));
    }

    public getUser() {
        return this.user;
    }

    private setAPITOKEN(token: string) {
        this.api_token = token;
        localStorage.setItem('API_TOKEN', token);
    }

    public getAPITOKEN() {
        // return this.api_token;
        return localStorage.getItem('API_TOKEN');
    }

    public getUserEmail() {
        return this.getUserFeature('email');
    }

    public getUserStoreID() {
        return this.getUserFeature('store_id');
    }

    private getUserFeature(feature: string) {
        let user: any;
        if (localStorage.getItem('user')) {
            user = localStorage.getItem('user');

            switch (feature) {
                case 'store_id':
                    return JSON.parse(user)?.store_id;
                case 'email':
                    return JSON.parse(user)?.email;
                default:
                    return;
            }


        }
    }

    public isLogged() {
        return this.api_token !== null;
    }

    public logout() {
        this.api_token = '';
        //localStorage.removeItem('ACCESS_TOKEN');
    }

}
