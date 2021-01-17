import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";

//ENVIRONMENT
import { environment } from "../../../environments/environment";

//Models
import { User } from '../models';
import { UserRoles } from '@modules/roles/models';
import { Response, SearchOptions } from '@modules/utility/models';

//SERVICES
import { AuthService } from '@modules/auth/services';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static service: string = 'users/'
  private apiRoot: string = environment.apiURLTaapaq + UserService.service;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  get(searchOption: SearchOptions): Observable<Response> {

    let apiRoot = this.apiRoot + 'pagination?page=' + searchOption.page;

    return this.http.post(apiRoot, searchOption, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      response.result = resultRAW.result?.map((data: any) => {

        let user = new User();
        user.id = data.id;
        user.login = data.login;

        user.person.id = data.person?.id;
        user.person.identification = data.person?.identification;
        user.person.name = data.person?.name;
        user.person.lastname = data.person?.lastname;
        user.person.email = data.person?.email;
        user.person.phone = data.person?.phone;
        user.person.address = data.person?.address;
        user.person.type_id = data.person?.type_id;

        user.type.id = data.person?.type?.id;
        user.type.name = data.person?.type?.name;

        user.company.id = data.company.id;
        user.company.person.name = data.company.name;

        //set Roles
        user.roles = data.roles?.map((role: any) => {
          return role.nickname;
        });

        return user;
      });

      response.records = resultRAW.records;

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  create(user: User): Observable<Response> {

    let apiRoot = this.apiRoot;

    return this.http.post(apiRoot, user, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;
      // response.result = resultRAW.result;
      if (resultRAW.result) {
        let user = new User();
        user.id = resultRAW.result?.id;
        response.result = user;
      }

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  getById(id: number): Observable<Response> {

    let apiRoot = this.apiRoot + id;

    return this.http.get(apiRoot, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      if (resultRAW.result) {
        let user = new User();
        user.id = resultRAW.result?.id;
        user.login = resultRAW.result?.login;
        user.universal_person_id = resultRAW.result?.universal_person_id;

        //user detail
        user.person.id = resultRAW.result?.person?.id;
        user.person.identification = resultRAW.result?.person?.identification;
        user.person.name = resultRAW.result?.person?.name;
        user.person.lastname = resultRAW.result?.person?.lastname;
        user.person.email = resultRAW.result?.person?.email;
        user.person.phone = resultRAW.result?.person?.phone;
        user.person.address = resultRAW.result?.person?.address;
        user.person.type_id = resultRAW.result?.person?.type_id;
        user.person.country_code = resultRAW.result?.person?.country_code;

        //set Roles IDs
        for (let index = 0; index < resultRAW.result?.roles.length; index++) {
          user.rolesID.push((resultRAW.result?.roles[index].id));
        }

        response.result = user;
      }

      // response.records = resultRAW.result?.length;

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  update(user: User): Observable<Response> {

    let apiRoot = this.apiRoot + user.id;

    //Encrypt
    user.password = btoa(user.password);
    user.repassword = btoa(user.repassword);

    return this.http.put(apiRoot, user, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;
      //response.result = resultRAW.result;

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  delete(id: string): Observable<Response> {

    let apiRoot = this.apiRoot + id;

    return this.http.delete(apiRoot, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;
      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  login(user: User): Observable<Response> {

    let apiRoot = environment.apiURLTaapaq + 'login';

    //Encrypt
    user.password = btoa(user.password);

    return this.http.post(apiRoot, user, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      response.status = resultRAW.status;
      response.message = resultRAW.message;

      if (resultRAW.result) {
        let user = new User();

        user.id = resultRAW.result?.id;
        user.login = resultRAW.result?.login;
        user.api_token = resultRAW.result?.api_token;
        user.isAdmin = resultRAW.result?.isAdmin;

        //user info
        user.person.identification = resultRAW.result?.person?.identification;
        user.person.name = resultRAW.result?.person?.name;
        user.person.lastname = resultRAW.result?.person?.lastname;
        // user.email = resultRAW.result?.id;
        // user.phone = resultRAW.result?.id;
        // user.address = resultRAW.result?.id;

        //company info
        user.company.id = resultRAW.result?.company?.id;
        user.company.person.name = resultRAW.result?.company?.person?.name;
        user.company.person.address = resultRAW.result?.company?.person?.address;

        //company settings
        user.company.setting.hasCashier = resultRAW.result?.company?.setting?.has_cashier;
        user.company.setting.hasBarcodeScanner = resultRAW.result?.company?.setting?.has_barcode_scanner;
        user.company.setting.payment_type_id = resultRAW.result?.company?.setting?.payment_type_id;
        user.company.setting.hasDiscountPercent = resultRAW.result?.company?.setting?.has_discount_percent;

        //project info
        user.project_id = resultRAW.result?.project?.id;
        user.project = resultRAW.result?.project?.name;

        //company country info
        user.company.person.country.id = resultRAW.result?.company?.person?.country?.id;
        user.company.person.country.name = resultRAW.result?.company?.person?.country?.name;
        user.company.person.country.code = resultRAW.result?.company?.person?.country?.code;
        user.company.person.country.currency = resultRAW.result?.company?.person?.country?.currency;
        user.company.person.country.currency_symbol = resultRAW.result?.company?.person?.country?.currency_symbol;
        user.company.person.country.locale = resultRAW.result?.company?.person?.country?.locale;
        user.company.person.country.tax = resultRAW.result?.company?.person?.country?.tax;

        //FK
        user.company_project_id = resultRAW.result?.company_project?.id;
        user.universal_person_id = resultRAW.result?.person?.id;

        response.result = user;
        //response.records = resultRAW.result?.length;

      }

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  register(user: User): Observable<Response> {

    let apiRoot = environment.apiURL + 'register';

    return this.http.post(apiRoot, user, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;
      //response.result = resultRAW.result;

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  assignMassiveRole(userRoles: UserRoles): Observable<Response> {

    let apiRoot = this.apiRoot + 'assignMassiveRole';

    return this.http.post(apiRoot, userRoles, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;
      //response.result = resultRAW.result;

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }


  logout() {

    let apiRoot = environment.apiURLTaapaq + 'logout';

    return this.http.get(apiRoot, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

}
