import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, switchMap } from "rxjs/operators";

//ENVIRONMENT
import { environment } from "../../../environments/environment";

//Models
import { SellInvoice } from '../models';
import { Response } from '@modules/utility/models';

//SERVICES
import { AuthService } from '@modules/auth/services';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {


  static service: string = 'sellInvoices/'

  private apiRoot: string = environment.apiURL + InvoiceService.service;

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.getAPITOKEN()
    })
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  createSellInvoice(sellInvoice: SellInvoice): Observable<Response> {

    let apiRoot = this.apiRoot;

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


}
