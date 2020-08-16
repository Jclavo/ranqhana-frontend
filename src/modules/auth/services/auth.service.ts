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

    public setUser(_user: User) {

        this.setAPITOKEN(_user.api_token);

        this.user.id = _user.id;
        this.user.login = _user.login;
        
        //user info
        // this.user.identification = _user.id;
        // this.user.name = _user.id;
        // this.user.lastname = _user.id;
        // this.user.email = _user.id;
        // this.user.phone = _user.id;
        // this.user.address = _user.id;
       
        //company info
        this.user.company_id = _user.company_id;
        this.user.company = _user.company;
    
        //project info
        this.user.project_id = _user.project_id;
        this.user.project =  _user.project;
        //country info
        this.user.country_id = _user.country_id;
        this.user.country = _user.country;
        this.user.countryCode = _user.countryCode;
        this.user.currency = _user.currency;
        
        //FK
        this.user.company_project_id = _user.company_project_id;
        this.user.user_detail_id = _user.user_detail_id;

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

    public getUserCountryCode() {
        return this.getUserFeature('countryCode');
    }

    public getUserCompanyID() {
        return this.getUserFeature('company_id');
    }

    public getUserCompanyName() {
        return this.getUserFeature('company');
    }

    public getUserProjectID() {
        return this.getUserFeature('project_id');
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
                case 'countryCode':
                    return JSON.parse(user)?.countryCode;
                case 'company_id':
                    return JSON.parse(user)?.company_id;
                case 'company':
                    return JSON.parse(user)?.company;
                case 'project_id':
                    return JSON.parse(user)?.project_id;
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
