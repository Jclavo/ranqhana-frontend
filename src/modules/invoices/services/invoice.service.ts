import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";

//ENVIRONMENT
import { environment } from "../../../environments/environment";

//Models
import { Invoice, SearchInvoice } from '../models';
import { Response, PaginationSum } from '@modules/utility/models';

//SERVICES
import { AuthService } from '@modules/auth/services';
import { CustomDateService } from '@modules/utility/services';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  static service: string = 'invoices/'
  private apiRoot: string = environment.apiURL + InvoiceService.service;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private customDateService: CustomDateService,
  ) { }

  get(searchOption: SearchInvoice): Observable<Response> {

    let apiRoot = this.apiRoot + 'pagination?page=' + searchOption.page;

    return this.http.post(apiRoot, searchOption, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;
      let paginationSum = new PaginationSum();

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      paginationSum.sum = resultRAW.result?.sum;
      paginationSum.values = resultRAW.result?.values.map((data: any) => {

        let invoice = new Invoice();
        invoice.id = data.id;
        invoice.serie = data.serie;
        invoice.subtotal = Number(data.subtotal);
        invoice.discount = Number(data.discount);
        invoice.discount_percent = data.discount_percent;
        invoice.total = Number(data.total);
        invoice.taxes = Number(data.taxes);
        invoice.stage = data.stage?.name;
        invoice.type = data.type?.name;
        invoice.created_at = this.customDateService.formatStringDDMMYYYY(data.created_at);

         
        //set Roles
        invoice.payments = data.payments?.map((payment: any) => {
          return payment;
        });

        return invoice;
      });

      response.result = paginationSum;
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

        let invoice = new Invoice();
        invoice.id = resultRAW.result.id;
        invoice.serie = resultRAW.result.serie;
        invoice.subtotal = resultRAW.result.subtotal;
        invoice.discount = resultRAW.result.discount;
        invoice.discount_percent = resultRAW.result.discount_percent;
        invoice.taxes = resultRAW.result.taxes;
        invoice.total = resultRAW.result.total;
        invoice.created_at = this.customDateService.formatStringDDMMYYYY(resultRAW.result.created_at);
        invoice.type_id = resultRAW.result.type?.code;
        invoice.type = resultRAW.result.type?.name;
        invoice.stage_id = resultRAW.result.stage?.code;
        invoice.external_user_id = resultRAW.result?.external_user_id;

        response.result = invoice;
      }

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  create(sellInvoice: Invoice): Observable<Response> {

    return this.http.post(this.apiRoot, sellInvoice, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      if (resultRAW.result) {
        let invoice = new Invoice();
        invoice.id = resultRAW.result?.id;
        invoice.order_id = resultRAW.result?.order?.id;

        response.result = invoice;
      }

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  update(sellInvoice: Invoice): Observable<Response> {

    let apiRoot = this.apiRoot + sellInvoice.id;

    return this.http.put(apiRoot, sellInvoice, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      if (resultRAW.result) {
        let sellInvoice = new Invoice();
        sellInvoice.id = resultRAW.result?.id;

        response.result = sellInvoice;
      }

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  anull(id: string): Observable<Response> {

    let apiRoot = this.apiRoot + 'anull/' + id;

    return this.http.get(apiRoot, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;
      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  generate(invoice: Invoice): Observable<Response> {

    let apiRoot = this.apiRoot + 'generate';

    return this.http.post(apiRoot, invoice, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;
      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }


}
