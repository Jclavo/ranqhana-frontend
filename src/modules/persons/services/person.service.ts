import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";

//ENVIRONMENT
import { environment } from "../../../environments/environment";

//Models
import { Person } from '../models';
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

        let person = new Person();
        person.id = data.id;
        person.identification = data?.identification;
        person.name = data.name;
        person.lastname = data.lastname;
        person.email = data.email;
        person.phone = data.phone;
        person.address = data.address;
        person.type_id = data.type_id;
        person.country_code = data.country_code;

        person.type.name = data.type?.name;

        return person;
      });

      response.records = resultRAW.records;

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
        let person = new Person();
        person.id = resultRAW.result.id;
        person.identification = resultRAW.result?.identification;
        person.name = resultRAW.result.name;
        person.lastname = resultRAW.result.lastname;
        person.email = resultRAW.result.email;
        person.phone = resultRAW.result.phone;
        person.address = resultRAW.result.address;
        person.type_id = resultRAW.result.type_id;
        person.country_code = resultRAW.result.country_code;

        response.result = person;
      }

      // response.records = resultRAW.result?.length;

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }


  create(person: Person): Observable<Response> {

    let apiRoot = this.apiRoot;

    return this.http.post(apiRoot, person, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;
      if (resultRAW.result) {

        let person = new Person();
        person.id = resultRAW.result?.id;
        response.result = person

      }

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  update(person: Person): Observable<Response> {

    let apiRoot = this.apiRoot + person.id;

    return this.http.put(apiRoot, person, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;
      //response.result = resultRAW.result;
      if (resultRAW.result) {

        let person = new Person();
        person.id = resultRAW.result?.id;
        response.result = person

      }

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
