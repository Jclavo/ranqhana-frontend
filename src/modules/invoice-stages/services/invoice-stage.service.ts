import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";

//ENVIRONMENT
import { environment } from "../../../environments/environment";

//Models
import { InvoiceStage } from '../models';
import { Response } from '../../utility/models';
import { AuthService } from '@modules/auth/services';

@Injectable({
  providedIn: 'root'
})
export class InvoiceStageService {

  static service: string = 'invoice-stages/'
  private apiRoot: string = environment.apiURL + InvoiceStageService.service;

  constructor(
    private http: HttpClient,
    private authService: AuthService,  
  ) { }

  getAll() : Observable<Response> { 

    let apiRoot = this.apiRoot;

    return this.http.get(apiRoot, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      response.result = resultRAW.result.map((item: any) => {

        let invoiceStage = new InvoiceStage();
        invoiceStage.id = item.code;
        invoiceStage.name = item.name;

        return invoiceStage;
      });

      response.result.unshift({id: 0, name: ''}) //Add ALL option

      response.records = resultRAW.result.length;

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }
}
