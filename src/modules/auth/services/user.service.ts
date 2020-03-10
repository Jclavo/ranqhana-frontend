import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";

//MODEL
import { User } from '../models';
import { Response } from '../../utility/models';

//ENVIRONMENT
import { environment } from "../../../environments/environment";

@Injectable()
export class UserService {

  private apiRoot: string = environment.apiURL;

  constructor(private http: HttpClient) {
    // this.user = {
    //     id: '123',
    //     firstName: 'Start',
    //     lastName: 'Bootstrap',
    //     email: 'no-reply@startbootstrap.com',
    // };
  }

  // set user(user: User) {
  //     userSubject.next(user);
  // }

  // get user$(): Observable<User> {
  //     return userSubject.asObservable();
  // }

  login(user: User): Observable<Response> {

    let apiRoot = this.apiRoot + 'login';

    return this.http.post(apiRoot, user).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      if (resultRAW.result) {
        let user = new User();
        user.id = resultRAW.result?.id;
        user.name = resultRAW.result?.name;
        user.email = resultRAW.result?.email;
        user.identification = resultRAW.result?.identification;
        user.country_code = resultRAW.result?.country_code;
        user.api_token = resultRAW.result?.api_token;
        user.store_id = resultRAW.result?.store_id;

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

    let apiRoot = this.apiRoot + 'register';
    return this.http.post(apiRoot, user).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;
      // response.result = resultRAW.result;
      // response.records = resultRAW.result.length;
      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }


}
