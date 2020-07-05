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
        user.identification = data.user_detail?.identification;
        user.name = data.user_detail?.name;
        user.lastname = data.user_detail?.lastname;
        user.email = data.user_detail?.email;
        user.phone = data.user_detail?.phone;
        user.address = data.user_detail?.address;
        user.company_id = data.company.id;
        user.company = data.company.name;

        //set Roles
        user.roles = data.roles?.map((role: any) => {
          return role.nickname;
        });
        // for (let index = 0; index < resultRAW.result?.roles.length; index++) {
        //   user.roles.push((resultRAW.result?.roles[index].nickname));
        // }

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
      //response.result = resultRAW.result;

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
        user.user_detail_id = resultRAW.result?.user_detail_id;

        //user detail
        user.identification = resultRAW.result?.user_detail?.identification;
        user.name = resultRAW.result?.user_detail?.name;
        user.lastname = resultRAW.result?.user_detail?.lastname;
        user.email = resultRAW.result?.user_detail?.email;
        user.phone = resultRAW.result?.user_detail?.phone;
        user.address = resultRAW.result?.user_detail?.address;

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

    let apiRoot = environment.apiURL + 'login';

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

        //user info
        // user.identification = resultRAW.result?.id;
        // user.name = resultRAW.result?.id;
        // user.lastname = resultRAW.result?.id;
        // user.email = resultRAW.result?.id;
        // user.phone = resultRAW.result?.id;
        // user.address = resultRAW.result?.id;

        //company info
        user.company_id = resultRAW.result?.company?.id;
        user.company = resultRAW.result?.company?.name;

        //project info
        user.project_id = resultRAW.result?.project?.id;
        user.project = resultRAW.result?.project?.name;

        //country info
        user.country_id = resultRAW.result?.country?.id;
        user.country = resultRAW.result?.country?.name;
        user.countryCode = resultRAW.result?.country?.code;
        user.currency = resultRAW.result?.country?.currency;

        //FK
        user.company_project_id = resultRAW.result?.id;
        user.user_detail_id = resultRAW.result?.id;

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

}
