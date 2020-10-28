import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";

//ENVIRONMENT
import { environment } from "../../../environments/environment";

//Models
import { OrderStage } from '../models';
import { Response } from '../../utility/models';
import { AuthService } from '@modules/auth/services';

@Injectable({
  providedIn: 'root'
})
export class OrderStageService {

  static service: string = 'order-stages/'
  private apiRoot: string = environment.apiURL + OrderStageService.service;

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

        let orderStage = new OrderStage();
        orderStage.id = item.code;
        orderStage.name = item.name;

        return orderStage;
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
