import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, switchMap } from "rxjs/operators";

//ENVIRONMENT
import { environment } from "../../../environments/environment";

//Models
import { Service, SearchServiceOptions } from '@modules/services/models';
import { StockType } from "@modules/stock-types/models";
import { Response } from '@modules/utility/models';

//SERVICES
import { AuthService } from '@modules/auth/services';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  static service: string =  'services/'

  private apiRoot: string = environment.apiURL + ServiceService.service;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  get(searchOption: SearchServiceOptions): Observable<Response> {

    let apiRoot = this.apiRoot + 'pagination?page=' + searchOption.page;

    return this.http.post(apiRoot, searchOption, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      response.result = resultRAW.result?.map((data: any, index: number) => {

        let service = new Service();
        service.id = data.id;
        service.name = data.name;
        service.description = data.description;
        service.price = data.price;
        service.created_at = data.created_at;
        service.updated_at = data.updated_at;

        //stock types
        service.stock_types = resultRAW.result[index]?.stock_types?.map(function(value: StockType) {
          return value.name;
        });

        return service;
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
        let service = new Service();
        service.id = resultRAW.result?.id;
        service.name = resultRAW.result?.name;
        service.description = resultRAW.result?.description;
        service.price = resultRAW.result?.price;
        service.created_at = resultRAW.result?.created_at;
        service.updated_at = resultRAW.result?.updated_at;

        //stock types
        service.stock_types = resultRAW.result?.stock_types.map(function(value: StockType) {
          return value.id;
        });

        response.result = service;
      }

      // response.records = resultRAW.result?.length;

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  create(service: Service): Observable<Response> {

    let apiRoot = this.apiRoot;

    return this.http.post(apiRoot, service, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;
      //response.result = resultRAW.result;

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  delete(id: string): Observable<Response> {

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

  update(service: Service): Observable<Response> {

    let apiRoot = this.apiRoot + service.id;

    return this.http.put(apiRoot, service, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;
      //response.result = resultRAW.result;

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }
}
