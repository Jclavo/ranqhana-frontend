import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";

//ENVIRONMENT
import { environment } from "../../../environments/environment";

//Models
import { PersonType } from '../models';
import { Response } from '../../utility/models';
import { AuthService } from '@modules/auth/services';


@Injectable({
  providedIn: 'root'
})
export class PersonTypeService {

  static service: string = 'person-types/'
  private apiRoot: string = environment.apiURL + PersonTypeService.service;

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

        let personType = new PersonType();
        personType.id = item.code;
        personType.name = item.name;

        return personType;
      });

      response.records = resultRAW.result.length;

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }
}
