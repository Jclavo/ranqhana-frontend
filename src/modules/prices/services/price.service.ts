import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";

//ENVIRONMENT
import { environment } from "../../../environments/environment";

//Models
import { Price } from '../models';
import { Response } from '@modules/utility/models';

//SERVICES
import { AuthService } from '@modules/auth/services';
import { CustomDateService } from '@modules/utility/services';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  static service: string = 'prices/'
  private apiRoot: string = environment.apiURL + PriceService.service;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private customDateService: CustomDateService,
  ) { }

  getSellPriceByItem(id: number): Observable<Response> {

    let apiRoot = this.apiRoot + 'sellPriceByItem/' + id;

    return this.http.get(apiRoot, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      response.result = resultRAW.result?.map((data: any) => {

        let price = new Price();
        // price.id = data.id;
        price.price = data?.price;
        price.created_at = this.customDateService.formatShortStringDDMMYYYY(data.created_at);

        return price;
      });

      response.records = resultRAW.records;

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  getPurchasePriceByItem(id: number): Observable<Response> {

    let apiRoot = this.apiRoot + 'purchasePriceByItem/' + id;

    return this.http.get(apiRoot, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      response.result = resultRAW.result?.map((data: any) => {

        let price = new Price();
        // price.id = data.id;
        price.price = data?.price;
        price.created_at = this.customDateService.formatShortStringDDMMYYYY(data.created_at);

        return price;
      });

      response.records = resultRAW.records;

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

}
