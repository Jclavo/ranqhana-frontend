import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";

//Models
import { Country } from '../models';
import { Response } from '../../utility/models';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiRoot: string = 'https://blooming-hamlet-62206.herokuapp.com/api/';
 // private resultObservable: Observable<Country[]>;

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
        country.country_code = item.country_code;
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
