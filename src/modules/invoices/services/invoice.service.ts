import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, switchMap } from "rxjs/operators";

//ENVIRONMENT
import { environment } from "../../../environments/environment";

//Models
import { SellInvoice, InvoiceDetail } from '../models';
import { Response } from '@modules/utility/models';

//SERVICES
import { AuthService } from '@modules/auth/services';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {


  // static service: string = 'sellInvoices/'

  // private apiRoot: string = environment.apiURL + InvoiceService.service;
  private apiRoot: string = environment.apiURL;

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.getAPITOKEN()
    })
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  get(parameters: any): Observable<Response> {

    let apiRoot = this.apiRoot + 'invoices/pagination?page=' + parameters.searchOption.page;

    return this.http.post(apiRoot, parameters, this.httpOptions).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      response.result = resultRAW.result?.map((data: any) => {

        let invoice = new SellInvoice();
        invoice.id       = data.id;
        invoice.serie    = data.serie;
        invoice.subtotal = data.subtotal;
        invoice.discount = data.discount;
        invoice.total    = data.total;
        invoice.created_at = data.created_at;
        // invoice.id = data.id;
        // invoice.id = data.id;
        // invoice.id = data.id;

        return invoice;
      });

      response.records = resultRAW.records;

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  createSellInvoice(sellInvoice: SellInvoice): Observable<Response> {

    let apiRoot = this.apiRoot + 'sellInvoices/';

    return this.http.post(apiRoot, sellInvoice, this.httpOptions).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      if (resultRAW.result) {
        let sellInvoice = new SellInvoice();
        sellInvoice.id = resultRAW.result?.id;

        response.result = sellInvoice;
      }

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  addInvoiceDetail(invoiceDetail: InvoiceDetail): Observable<Response> {

    let apiRoot = this.apiRoot + 'invoiceDetails/';

    return this.http.post(apiRoot, invoiceDetail, this.httpOptions).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      if (resultRAW.result) {
        let invoiceDetail = new InvoiceDetail();
        invoiceDetail.id = resultRAW.result?.id;
        response.result = invoiceDetail;
      }

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));

  }

  updateInvoice(sellInvoice: SellInvoice): Observable<Response> {

    let apiRoot = this.apiRoot + 'invoices/' + sellInvoice.id;

    return this.http.put(apiRoot, sellInvoice, this.httpOptions).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      if (resultRAW.result) {
        let sellInvoice = new SellInvoice();
        sellInvoice.id = resultRAW.result?.id;

        response.result = sellInvoice;
      }

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  delete(id: string): Observable<Response> {

    let apiRoot = this.apiRoot + 'invoices/' + id;

    return this.http.delete(apiRoot, this.httpOptions).pipe(map(res => {

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
