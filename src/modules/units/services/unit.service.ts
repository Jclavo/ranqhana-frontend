import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";

//ENVIRONMENT
import { environment } from "../../../environments/environment";

//Models
import { Unit } from '../models';
import { Response } from '../../utility/models';
import { SearchOptions } from '@modules/utility/models';

//SERVICES
import { AuthService } from '@modules/auth/services';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  static service: string = 'units/'
  private apiRoot: string = environment.apiURL + UnitService.service;;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  get(): Observable<Response> {

    return this.pagination(new SearchOptions());

    // let apiRoot = this.apiRoot;

    // return this.http.get(apiRoot, this.authService.getHeaders()).pipe(map(res => {

    //   let response = new Response();
    //   let resultRAW: any = res;

    //   //Set response
    //   response.status = resultRAW.status;
    //   response.message = resultRAW.message;

    //   response.result = resultRAW.result.map((data: any) => {

    //     let unit = new Unit();
    //     unit.id = data.id;
    //     unit.abbreviation = data.code;
    //     unit.name = data.description;
    //     return unit;
    //   });

    //   response.records = resultRAW.result.length;

    //   return response;

    // }),
    //   catchError(error => {
    //     return throwError(error.message);
    //   }));
  }

  pagination(parameters: SearchOptions): Observable<Response> {

    
    let apiRoot = this.apiRoot + 'pagination?page=' + parameters.page;

    return this.http.post(apiRoot, parameters, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      response.result = resultRAW.result?.map((data: any) => {

        let unit = new Unit();
        unit.id = data.code;
        unit.abbreviation = data.abbreviation;
        unit.name = data.name;
        unit.fractioned = data.fractioned;
        // unit.created_at = data.created_at;
        // unit.updated_at = data.updated_at;

        return unit;
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
        let unit = new Unit();
        unit.id = resultRAW.result?.code;
        unit.abbreviation = resultRAW.result?.abbreviation;
        unit.name = resultRAW.result?.name;
        unit.fractioned = resultRAW.result?.fractioned;

        response.result = unit;
      }

      // response.records = resultRAW.result?.length;

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  create(unit: Unit): Observable<Response> {

    let apiRoot = this.apiRoot;

    return this.http.post(apiRoot, unit, this.authService.getHeaders()).pipe(map(res => {

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

  update(unit: Unit): Observable<Response> {

    let apiRoot = this.apiRoot + unit.id;

    return this.http.put(apiRoot, unit, this.authService.getHeaders()).pipe(map(res => {

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
