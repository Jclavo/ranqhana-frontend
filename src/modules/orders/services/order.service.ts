import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";

//ENVIRONMENT
import { environment } from "../../../environments/environment";

//Models
import { Order, SearchOrder } from '../models';
import { Response } from '@modules/utility/models';

//SERVICES
import { AuthService } from '@modules/auth/services';
import { CustomDateService } from '@modules/utility/services';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  static service: string = 'orders/'
  private apiRoot: string = environment.apiURL + OrderService.service;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private customDateService: CustomDateService,
  ) { }

  get(searchOption: SearchOrder): Observable<Response> {

    let apiRoot = this.apiRoot + 'pagination?page=' + searchOption.page;

    return this.http.post(apiRoot, searchOption, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      response.result = resultRAW.result?.map((data: any) => {

        let order = new Order();
        order.id = data.id;
        // order.serie = data.serie;
        order.invoice_id = data.invoice_id;
        order.stage_id = data.stage_id;
        order.stage_name = data.stage?.name;
        order.invoice_stage_name = data.invoice?.stage?.description;
        order.created_at = this.customDateService.formatStringDDMMYYYY(data.created_at);

        return order;
      });

      response.records = resultRAW.records;

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  getById(id: number): Observable<Response> {

    let apiRoot = this.apiRoot + id;

    return this.http.get(apiRoot, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      if (resultRAW.result) {

        let order = new Order();
        order.id = resultRAW.result?.id;
        order.invoice_id = resultRAW.result?.invoice_id;
        order.stage_id = resultRAW.result?.stage_id;

        response.result = order;
      }

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  changeStatus(order: Order): Observable<Response> {

    let apiRoot = this.apiRoot + 'changeStatus';

    return this.http.post(apiRoot, order, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      if (resultRAW.result) {
        let order = new Order();
        order.id = resultRAW.result?.id;

        response.result = order;
      }

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }
}
