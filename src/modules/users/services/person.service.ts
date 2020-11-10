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
export class PersonService {

  static service: string = 'persons/'
  private apiRoot: string = environment.apiURLTaapaq + PersonService.service;

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
        user.universal_person_id = data.id;
        user.identification = data?.identification;
        user.name = data.name;
        user.lastname = data.lastname;
        user.email = data.email;
        user.phone = data.phone;
        user.address = data.address;

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
      if (resultRAW.result) {

        let user = new User();
        user.universal_person_id = resultRAW.result?.id;
        response.result = user

      }

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  update(user: User): Observable<Response> {

    let apiRoot = this.apiRoot + user.universal_person_id;

    return this.http.put(apiRoot, user, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;
      //response.result = resultRAW.result;
      if (resultRAW.result) {

        let user = new User();
        user.universal_person_id = resultRAW.result?.id;
        response.result = user

      }

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

}
