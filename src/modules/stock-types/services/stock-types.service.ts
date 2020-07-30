import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";

//ENVIRONMENT
import { environment } from "../../../environments/environment";

//Models
import { StockTypes } from '../models';
import { Response } from '@modules/utility/models';

//SERVICES
import { AuthService } from '@modules/auth/services';
import { CustomDateService } from '@modules/utility/services';

@Injectable({
  providedIn: 'root'
})
export class StockTypesService {

  static service: string = 'stockTypes/'
  private apiRoot: string = environment.apiURL + StockTypesService.service;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private customDateService: CustomDateService,
  ) { }

  get(): Observable<Response> {

    let apiRoot = this.apiRoot;

    return this.http.get(apiRoot, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      response.result = resultRAW.result?.map((data: any) => {

        let stockTypes = new StockTypes();
        stockTypes.id   = data.id;
        stockTypes.name = data.name;

        return stockTypes;
      });

      response.records = resultRAW.records;

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }
}
