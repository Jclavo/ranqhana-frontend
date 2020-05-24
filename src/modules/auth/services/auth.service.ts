import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
//MODEL
import { User } from '@modules/users/models';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {

    private api_token: string = '';
    public user = new User();

    constructor(
        private router: Router,
    ) { }

    public setUser(userInfo: User) {

        this.setAPITOKEN(userInfo.api_token);
        // this.api_token = userInfo.api_token;
        this.user.id = userInfo.id;
        this.user.name = userInfo.name;
        this.user.email = userInfo.email;
        this.user.identification = userInfo.identification;
        this.user.countryCode = userInfo.countryCode;
        this.user.store_id = userInfo.store_id;
        this.user.login = userInfo.login;

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

    public getLogin() {
        return this.getUserFeature('login');
    }

    public getUserStoreID() {
        return this.getUserFeature('store_id');
    }

    public getHeaders() {
        return {
          headers: new HttpHeaders({
            'Authorization': 'Bearer ' + this.getAPITOKEN()
          })
        };
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
                case 'login':
                    return JSON.parse(user)?.login;
                default:
                    return;
            }


        }
    }

    public isLogged() {
        if(this.getAPITOKEN())
            return true;
        return false;
    }

    public logout() {
        this.cleanStorage();
        this.router.navigate(['/login']);
    }

    public raiseError(){
        this.logout();
    }

    public cleanStorage(){
        localStorage.removeItem('API_TOKEN');
        localStorage.removeItem('user');
    }

}
