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
}
