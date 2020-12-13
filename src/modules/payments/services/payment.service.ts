import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";

//ENVIRONMENT
import { environment } from "../../../environments/environment";

//Models
import { Payment } from '../models';
import { Response } from '../../utility/models';
import { AuthService } from '@modules/auth/services';
import { CustomDateService } from '@modules/utility/services';
import { PaymentType } from '@modules/payment-types/models';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  static service: string = 'payments/'
  private apiRoot: string = environment.apiURL + PaymentService.service;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private customDateService: CustomDateService,
  ) { }

  create(payment: Payment): Observable<Response> {

    let apiRoot = this.apiRoot;

    return this.http.post(apiRoot, payment, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      if (resultRAW.result) {
        let payment = new Payment();
        payment.id = resultRAW.result?.id;
        response.result = payment;
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

      if (resultRAW.result) {
        let payment = new Payment();
        payment.id = resultRAW.result?.id;
        payment.amount = resultRAW.result?.amount;
        payment.money = resultRAW.result?.money;
        payment.payment_date = this.customDateService.formatShortStringDDMMYYYY(resultRAW.result?.payment_date);
        payment.real_payment_date = this.customDateService.formatShortStringDDMMYYYY(resultRAW.result?.real_payment_date);
        payment.invoice_id = resultRAW.result?.invoice_id;
        payment.method_id = resultRAW.result?.method_id;
        payment.stage_id = resultRAW.result?.stage_id;

        // set payment type
        payment.type.id = resultRAW.result?.invoice?.payment?.id;
        payment.type.name = resultRAW.result?.invoice?.payment?.name;

        response.result = payment;
      }

      // response.records = resultRAW.result?.length;

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  getByInvoiceId(id: number): Observable<Response> {

    let apiRoot = this.apiRoot + 'invoices/' + id;

    return this.http.get(apiRoot, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      response.result = resultRAW.result?.map((data: any) => {

        let payment = new Payment();
        payment.id = data.id;
        payment.amount = data.amount;
        payment.money = data.money;
        payment.transaction_code = data.transaction_code;
        // payment.payment_date = this.customDateService.formatShortStringDDMMYYYY(data.payment_date);
        payment.payment_date = data.payment_date;
        payment.real_payment_date = this.customDateService.formatShortStringDDMMYYYY(data.real_payment_date);
        payment.invoice_id = data.invoice_id;
        payment.method_id = data.method_id;
        payment.stage_id = data.stage_id;

        payment.method = data.method?.name;
        payment.stage = data.stage?.name;

        return payment;
      });

      // response.records = resultRAW.result?.length;

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  save(payment: Payment): Observable<Response> { //update

    let apiRoot = this.apiRoot + payment.id;

    return this.http.put(apiRoot, payment, this.authService.getHeaders()).pipe(map(res => {

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

  delete(id: Number): Observable<Response> {

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

  updatePaymentDate(payment: Payment): Observable<Response> {

    let apiRoot = this.apiRoot + 'updatePaymentDate';

    return this.http.post(apiRoot, payment, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      if (resultRAW.result) {
        let payment = new Payment();
        payment.id = resultRAW.result?.id;

        response.result = payment;
      }

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }


}
