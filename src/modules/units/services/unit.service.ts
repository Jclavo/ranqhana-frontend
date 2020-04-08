import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";

//ENVIRONMENT
import { environment } from "../../../environments/environment";

//Models
import { Unit } from '../models';
import { Response } from '../../utility/models';

//SERVICES
import { AuthService } from '@modules/auth/services';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  static service: string =  'units/'
  private apiRoot: string = environment.apiURL + UnitService.service;;

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.getAPITOKEN()
      })
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  get(): Observable<Response> {

    let apiRoot = this.apiRoot;

    return this.http.get(apiRoot, this.httpOptions).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      response.result = resultRAW.result.map((data: any) => {

        let unit = new Unit();
        unit.id = data.id;
        unit.code = data.code;
        unit.description = data.description;
        return unit;
      });

      response.records = resultRAW.result.length;

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  pagination(parameters: any): Observable<Response> {

    let apiRoot = this.apiRoot + 'pagination?page=' + parameters.page;

    return this.http.post(apiRoot, parameters, this.httpOptions).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      response.result = resultRAW.result?.map((data: any) => {

        let unit = new Unit();
        unit.id = data.id;
        unit.code = data.code;
        unit.description = data.description;
        unit.allow_decimal = data.allow_decimal;
        unit.created_at = data.created_at;
        unit.updated_at = data.updated_at;

        return unit;
      });

      response.records = resultRAW.records;

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }
}
