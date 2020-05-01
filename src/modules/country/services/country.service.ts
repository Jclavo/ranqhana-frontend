import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";

//ENVIRONMENT
import { environment } from "../../../environments/environment";

//Models
import { Country } from '../models';
import { Response } from '../../utility/models';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiRoot: string = environment.apiURL;

  constructor(private http: HttpClient) { }

  getAll() : Observable<Response> { 

    let apiRoot = this.apiRoot + 'country';

    return this.http.get(apiRoot).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      response.result = resultRAW.result.map((item: any) => {

        let country = new Country();
        country.id = item.id;
        country.code = item.code;
        country.name = item.name;

        return country;
      });

      response.records = resultRAW.result.length;

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }
}
