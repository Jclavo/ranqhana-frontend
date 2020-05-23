import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";

//ENVIRONMENT
import { environment } from "../../../environments/environment";

//Models
import { User } from '../models';
import { Response, SearchOptions } from '@modules/utility/models';

//SERVICES
import { AuthService } from '@modules/auth/services';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static service: string = 'users/'
  private apiRoot: string = environment.apiURL + UserService.service;

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
        user.identification = data.identification;
        user.name = data.name;
        user.lastname = data.lastname;
        user.email = data.email;
        user.phone = data.phone;
        user.address = data.address;
        user.store_id = data.store_id;
        user.store = data.store;

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
        user.identification = resultRAW.result?.identification;
        user.name = resultRAW.result?.name;
        user.lastname = resultRAW.result?.lastname;
        user.phone = resultRAW.result?.phone;
        user.address = resultRAW.result?.address;
        user.email = resultRAW.result?.email;
        user.store_id = resultRAW.result?.store_id;
        user.countryCode = resultRAW.result?.country_code;

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

}
