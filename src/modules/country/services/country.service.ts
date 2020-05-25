import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";

//ENVIRONMENT
import { environment } from "../../../environments/environment";

//Models
import { Country } from '../models';
import { Response } from '../../utility/models';
import { AuthService } from '@modules/auth/services';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  static service: string = 'countries/'
  private apiRoot: string = environment.apiURL + CountryService.service;

  constructor(
    private http: HttpClient,
    private authService: AuthService,  
  ) { }

  getAll() : Observable<Response> { 

    let apiRoot = this.apiRoot;

    return this.http.get(apiRoot, this.authService.getHeaders()).pipe(map(res => {

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
