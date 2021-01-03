import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from "rxjs/operators";

//ENVIRONMENT
import { environment } from "../../../environments/environment";

//Models
import { InvoiceDetail, Invoice } from '../models';
import { Response } from '@modules/utility/models';

//SERVICES
import { AuthService } from '@modules/auth/services';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDetailService {

  static service: string = 'invoiceDetails/'
  private apiRoot: string = environment.apiURL + InvoiceDetailService.service;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  create(invoiceDetail: InvoiceDetail): Observable<Response> {

    return this.http.post(this.apiRoot, invoiceDetail, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      if (resultRAW.result) {

        // let invoiceDetail = new InvoiceDetail();
        // invoiceDetail.id = resultRAW.result?.id;
        // response.result = invoiceDetail;

        let invoice = new Invoice();

        invoice.id = resultRAW.result.id;
        invoice.serie = resultRAW.result.serie;
        invoice.subtotal = resultRAW.result.subtotal;
        invoice.discount = resultRAW.result.discount;
        invoice.discount_percent = resultRAW.result.discount_percent;
        invoice.taxes = resultRAW.result.taxes;
        invoice.total = resultRAW.result.total;
        invoice.type_id = resultRAW.result.type?.code;
        invoice.type = resultRAW.result.type?.name;
        invoice.stage_id = resultRAW.result.stage?.code;
        invoice.external_user_id = resultRAW.result?.external_user_id;

        //order
        invoice.order.id = resultRAW.result?.order?.id;
        invoice.order.stage_id = resultRAW.result?.order?.stage_id;

        invoice.order_id = invoice.order.id;

        //details
        invoice.details = resultRAW.result?.details.map((detail: any) => {

          let invoiceDetails = new InvoiceDetail();
          invoiceDetails.id       = detail.id;
          invoiceDetails.item_id  = detail.item_id;
          invoiceDetails.item     = detail.item?.name;
          invoiceDetails.unit     = detail.item?.unit?.abbreviation;
          invoiceDetails.quantity = detail.quantity;
          invoiceDetails.price    = detail.price;
          invoiceDetails.total    = detail.total;
          
          return invoiceDetails;
        });

        response.result = invoice;
      }

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

      response.result = resultRAW.result?.map((data: any) => {

        let invoiceDetails = new InvoiceDetail();
        invoiceDetails.id       = data.id;
        invoiceDetails.item_id  = data.item_id;
        invoiceDetails.item     = data.item?.name;
        invoiceDetails.unit     = data.item?.unit?.abbreviation;
        invoiceDetails.quantity = data.quantity;
        invoiceDetails.price    = data.price;
        invoiceDetails.total    = data.total;
        
        return invoiceDetails;
      });

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  delete(id: number): Observable<Response> {

    let apiRoot = this.apiRoot + id;

    return this.http.delete(apiRoot, this.authService.getHeaders()).pipe(map(res => {

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
