import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";

//ENVIRONMENT
import { environment } from "../../../environments/environment";

//Models
import { Response, Graphic } from '@modules/utility/models';
import { SearchInvoice } from "@modules/invoices/models";

//SERVICES
import { AuthService } from '@modules/auth/services';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  static service: string = 'reports/'
  private apiRoot: string = environment.apiURL + ReportService.service;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { } 


  invoiceMoney(searchOption: SearchInvoice): Observable<Response> {

    let apiRoot = this.apiRoot + 'invoiceMoney';

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
