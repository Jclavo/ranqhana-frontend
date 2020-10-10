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

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  static service: string = 'payments/'
  private apiRoot: string = environment.apiURL + PaymentService.service;

  constructor(
    private http: HttpClient,
    private authService: AuthService,  
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
}
