import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, switchMap } from "rxjs/operators";

//ENVIRONMENT
import { environment } from "../../../environments/environment";

//Models
import { Language } from '../models';
import { Response } from '@modules/utility/models';

//SERVICES
import { AuthService } from '@modules/auth/services';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  static service: string =  'languages/';
  private apiRoot: string = environment.apiURLTaapaq + LanguageService.service;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  get(): Observable<Response> {

    let apiRoot = this.apiRoot;

    return this.http.get(apiRoot, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      response.result = resultRAW.result?.map((data: any, index: number) => {

        let language = new Language();
        language.id = data.id;
        language.name = data.name;
        language.locale = data.locale;
        return language;
      });

      response.records = resultRAW.records;

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }
}
