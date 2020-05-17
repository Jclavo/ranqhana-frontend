import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";

//ENVIRONMENT
import { environment } from "../../../environments/environment";

//Models
import { Store } from '../models';
import { Response, SearchOptions } from '@modules/utility/models';

//SERVICES
import { AuthService } from '@modules/auth/services';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  static service: string = 'stores/'
  private apiRoot: string = environment.apiURL + StoreService.service;

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

        let store = new Store();
        store.id = data.id;
        store.name = data.name;
        store.code = data.code;
        store.country = data.country;

        return store;
      });

      response.records = resultRAW.records;

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }
}
