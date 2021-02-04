import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

//MODEL
import { User } from '@modules/users/models';
import { Language } from '@modules/languages/models';

//ENVIRONMENT
import { environment } from "../../../environments/environment";

@Injectable()
export class AuthService {

    private api_token: string = '';
    // public user = new User();

    constructor(
        private router: Router,
    ) { }

    public setUser(user: User) {

        this.setAPITOKEN(user.api_token);
        localStorage.setItem('user', JSON.stringify(user));

        // this.user.id = _user.id;
        // this.user.login = _user.login;
        // this.user.isAdmin = _user.isAdmin;

        // //user info
        // // this.user.identification = _user.id;
        // this.user.person.name = _user.person.name;
        // this.user.person.lastname = _user.person.lastname;
        // // this.user.email = _user.id;
        // // this.user.phone = _user.id;
        // // this.user.address = _user.id;

        // //company info
        // this.user.company.id = _user.company.id;
        // this.user.company.person.name = _user.company.person.name;
        // this.user.company.person.address = _user.company.person.address;

        // //company settings
        // this.user.company.setting.hasCashier = _user.company.setting.hasCashier;
        // this.user.company.setting.hasBarcodeScanner = _user.company.setting.hasBarcodeScanner;

        // //project info
        // this.user.project_id = _user.project_id;
        // this.user.project = _user.project;
        // //country info

        // this.user.company.person.country.id = _user.company.person.country.id;
        // this.user.company.person.country.code = _user.company.person.country.code;
        // this.user.company.person.country.currency = _user.company.person.country.currency;
        // this.user.company.person.country.locale = _user.company.person.country.locale;
        // this.user.company.person.country.tax = _user.company.person.country.tax;

        // //FK
        // this.user.company_project_id = _user.company_project_id;
        // // this.user.universal_person_id = _user.universal_person_id;
    }

    private setAPITOKEN(token: string) {
        this.api_token = token;
        localStorage.setItem('API_TOKEN', token);
    }

    public getAPITOKEN() {
        return localStorage.getItem('API_TOKEN');
    }

    public getLocale() {
        let currentLanguage = window.location.href.split('/')[3];
        if (!Language.getLocales().includes(currentLanguage)) {
            currentLanguage = 'en';
        }
        return currentLanguage;
    }

    public getUserEmail() {
        return this.getUserFeature('email');
    }

    public getUserFullName() {
        return this.getUserFeature('name') + ' ' + this.getUserFeature('lastname');
    }

    public getLogin() {
        return this.getUserFeature('login');
    }

    public getCompanyCountryCode() {
        return this.getUserFeature('country_code');
    }

    public getCompanyID() {
        return this.getUserFeature('company_id');
    }

    public getCompanyName() {
        return this.getUserFeature('company');
    }

    public getUserProjectID() {
        return this.getUserFeature('project_id');
    }

    public getUserID() {
        return this.getUserFeature('id');
    }

    public getUserCompanyProjectID() {
        return this.getUserFeature('company_project_id');
    }

    public getCompanyAddress() {
        return this.getUserFeature('company_address');
    }


    public getCompanyTax() {
        return this.getUserFeature('tax');
    }

    public getCompanyImage() {
        return this.getUserFeature('company_image');
    }

    public getCompanyCurrencySymbol() {
        return this.getUserFeature('currency_symbol');
    }

    public getCompanySettingHasCashier() {
        return this.getUserFeature('has_cashier');
    }

    public getCompanySettingHasBarcodeScanner() {
        return this.getUserFeature('has_barcode_scanner');
    }

    public getCompanyPaymentTypeID() {
        return this.getUserFeature('payment_type_id');
    }

    public getCompanyHasDiscountPercent() {
        return this.getUserFeature('has_discount_percent');
    }

    public getCompanyPrinterWorkflowForInvoice() {
        return this.getUserFeature('printer_workflow_for_invoice');
    }

    public getUserIsAdmin() {
        return this.getUserFeature('isAdmin');
    }

    public getURLImage() {
        return environment.apiURLImage + this.getUserCompanyProjectID() + '/';
    }

    public getHeaders() {
        return {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + this.getAPITOKEN(),
                'X-lang': this.getLocale(),
            })
        };
    }

    private getUserFeature(feature: string) {
        let user: any;
        if (localStorage.getItem('user')) {
            user = localStorage.getItem('user');

            switch (feature) {
                case 'id':
                    return JSON.parse(user)?.id;
                case 'login':
                    return JSON.parse(user)?.login;
                case 'isAdmin':
                    return JSON.parse(user)?.isAdmin;
                case 'email':
                    return JSON.parse(user)?.person.email;
                case 'name':
                    return JSON.parse(user)?.person.name;
                case 'lastname':
                    return JSON.parse(user)?.person.lastname;
                // case 'user_image':
                //      return JSON.parse(user)?.person.images[0]?.name;
                case 'company_project_id':
                    return JSON.parse(user)?.company_project_id;
                case 'project_id':
                    return JSON.parse(user)?.project_id;
                case 'company_id':
                    return JSON.parse(user)?.company.id;
                case 'company':
                    return JSON.parse(user)?.company.person.name;
                case 'company_address':
                    return JSON.parse(user)?.company.person.address;
                case 'country_code':
                    return JSON.parse(user)?.company.person.country.code;
                case 'currency_symbol':
                    return JSON.parse(user)?.company.person.country.currency_symbol;
                case 'tax':
                    return JSON.parse(user)?.company.person.country.tax;
                case 'company_image':
                    let images = JSON.parse(user)?.company.person?.images;
                    if (Array.isArray(images)) {
                        return images[0]?.name;
                    }
                    return '';
                case 'has_cashier':
                    return JSON.parse(user)?.company.setting.hasCashier;
                case 'has_barcode_scanner':
                    return JSON.parse(user)?.company.setting.hasBarcodeScanner;
                case 'payment_type_id':
                    return JSON.parse(user)?.company.setting.payment_type_id;
                case 'has_discount_percent':
                    return JSON.parse(user)?.company.setting.hasDiscountPercent;
                case 'printer_workflow_for_invoice':
                    return JSON.parse(user)?.company.setting.printerWorkflowForInvoice;
                default:
                    return;
            }


        }
    }

    public isLogged() {
        if (this.getAPITOKEN())
            return true;
        return false;
    }

    public logout() {
        this.cleanStorage();
        this.router.navigate(['/']);
    }

    public raiseError() {
        this.logout();
    }

    public cleanStorage() {
        localStorage.removeItem('API_TOKEN');
        localStorage.removeItem('user');
    }

}
