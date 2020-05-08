import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";

//ENVIRONMENT
import { environment } from "../../../environments/environment";

//Models
import { Invoice } from '../models';
import { Response, Graphic } from '@modules/utility/models';
import { SearchInvoice } from "../models/SearchInvoice.model";

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

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      response.result = resultRAW.result?.map((data: any) => {

        let invoice = new Invoice();
        invoice.id       = data.id;
        invoice.serie    = data.serie;
        invoice.subtotal = data.subtotal;
        invoice.discount = data.discount;
        invoice.total    = data.total;
        invoice.stage    = data.stage;
        invoice.created_at = this.customDateService.formatStringDDMMYYYY(data.created_at); 

        return invoice;
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

        let invoice = new Invoice();
        invoice.id       = resultRAW.result[0].id;
        invoice.serie    = resultRAW.result[0].serie;
        invoice.subtotal = resultRAW.result[0].subtotal;
        invoice.discount = resultRAW.result[0].discount;
        invoice.total    = resultRAW.result[0].total;
        invoice.stage    = resultRAW.result[0].stage;
        invoice.created_at = this.customDateService.formatStringDDMMYYYY(resultRAW.result[0].created_at); 
        invoice.store    = resultRAW.result[0].store;
        invoice.type     = resultRAW.result[0].type;

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


  report(searchOption: SearchInvoice): Observable<Response> {

    let apiRoot = this.apiRoot + 'graphicReport';

    return this.http.post(apiRoot, searchOption, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      response.result = resultRAW.result?.map((data: any) => {

        let grafic = new Graphic();
        grafic.X = data.X;
        grafic.Y = data.Y;

        return grafic;
      });

      response.records = resultRAW.records;

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }




}
