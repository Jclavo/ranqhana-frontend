import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, switchMap } from "rxjs/operators";

//ENVIRONMENT
import { environment } from "../../../environments/environment";

//Models
import { Item, SearchItemOptions } from '@modules/items/models';
import { StockType } from "@modules/stock-types/models";
import { Response } from '@modules/utility/models';
import { Image } from "@modules/utility/models";

//SERVICES
import { AuthService } from '@modules/auth/services';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  static service: string =  'items/';
  static sub_service_product: string =  'products/';
  static sub_service_service: string =  'services/'

  private apiRoot: string = environment.apiURL + ItemService.service;
  private apiRootProduct: string = environment.apiURL + ItemService.service + ItemService.sub_service_product;
  private apiRootService: string = environment.apiURL + ItemService.service + ItemService.sub_service_service;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  get(searchOption: SearchItemOptions): Observable<Response> {

    let apiRoot = this.apiRoot + 'pagination?page=' + searchOption.page;

    return this.http.post(apiRoot, searchOption, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      response.result = resultRAW.result?.map((data: any, index: number) => {

        let item = new Item();
        item.id = data.id;
        item.name = data.name;
        item.description = data.description;
        item.price = Number(data.price);
        item.stock = Number(data.stock);
        item.unit_id = data.unit_id;
        item.unit = data.unit;
        item.fractioned = data.fractioned;
        item.stocked = data.stocked;
        item.store_id = data.store_id;
        item.type_id = data.type_id;
        item.created_at = data.created_at;
        item.updated_at = data.updated_at;

        //stock types
        item.stock_types = data.stock_types?.map(function(value: StockType) {
          return value.name;
        });

        //stock images
        item.images =  data.images?.map(function(value: Image) {
          let image = new Image();
          image.id = value.id;
          image.name = value.name;
          return image;
        });

        //type
        // item.type = data.type?.name;

        return item;
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
        let item = new Item();
        item.id = resultRAW.result?.id;
        item.name = resultRAW.result?.name;
        item.description = resultRAW.result?.description;
        item.price = resultRAW.result?.price;
        item.unit_id = resultRAW.result?.unit_id;
        // item.unit = resultRAW.result?.unit;
        item.stocked = resultRAW.result?.stocked;
        item.store_id = resultRAW.result?.store_id;
        item.created_at = resultRAW.result?.created_at;
        item.updated_at = resultRAW.result?.updated_at;

        //stock types
        item.stock_types = resultRAW.result?.stock_types.map(function(value: StockType) {
          return value.id;
        });

        //stock images
        item.images = resultRAW.result?.images.map(function(value: Image) {
          
          let image = new Image();
          image.id = value.id;
          image.name = value.name;
          return image;
        });

        response.result = item;
      }

      // response.records = resultRAW.result?.length;

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

  /**
   * 
   * PRODUCT methods
   */

  createProduct(item: Item): Observable<Response> {

    let apiRoot = this.apiRootProduct;

    return this.http.post(apiRoot, item, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      if (resultRAW.result) {
        let item = new Item();
        item.id = resultRAW.result?.id;
        response.result = item;
      }
      

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  updateProduct(item: Item): Observable<Response> {

    let apiRoot = this.apiRootProduct + item.id;

    return this.http.put(apiRoot, item, this.authService.getHeaders()).pipe(map(res => {

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

  /**
   * 
   * SERVICE methods
   */

  createService(item: Item): Observable<Response> {

    let apiRoot = this.apiRootService;

    return this.http.post(apiRoot, item, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;
      //response.result = resultRAW.result;

      if (resultRAW.result) {
        let item = new Item();
        item.id = resultRAW.result?.id;
        response.result = item;
      }

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  updateService(item: Item): Observable<Response> {

    let apiRoot = this.apiRootService + item.id;

    return this.http.put(apiRoot, item, this.authService.getHeaders()).pipe(map(res => {

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
