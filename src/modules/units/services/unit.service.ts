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

      response.result = resultRAW.result.map((item: any) => {

        let unit = new Unit();
        unit.id = item.id;
        unit.code = item.code;
        unit.description = item.description;
        return unit;
      });

      response.records = resultRAW.result.length;

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }
}
