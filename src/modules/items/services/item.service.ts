import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, switchMap } from "rxjs/operators";

//Models
import { Item, SearchOptions } from '@modules/items/models';
import { Response } from '@modules/utility/models';

//SERVICES
import { AuthService } from '@modules/auth/services';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private apiRoot: string = 'https://blooming-hamlet-62206.herokuapp.com/api/';

  private httpOptions = {
    headers: new HttpHeaders({
      //'Content-Type':  'application/json',
      // 'Authorization': 'Bearer ' + this.authService.getAPITOKEN()
      'Authorization': 'Bearer ' + 'u4qeJOGrJ9YhcS87JQnBo6TWdGZondrpgBov1UvhCh28AkstO71agbsTZ2oz8bz2GMAMlmJY8whsF2I5'
      })
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  get(parameters: any): Observable<Response> {

    let apiRoot = this.apiRoot + 'items/pagination?page=' + parameters.searchOption.page;

    return this.http.post(apiRoot, parameters, this.httpOptions).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      response.result = resultRAW.result?.map((data: any) => {

        let item = new Item();
        item.id = data.id;
        item.name = data.name;
        item.description = data.description;
        item.quantity = data.quantity;
        item.store_id = data.store_id;
        item.created_at = data.created_at;
        item.updated_at = data.updated_at;

        return item;
      });

      response.records = resultRAW.records;

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  create(item: Item): Observable<Response> {

    let apiRoot = this.apiRoot + 'items';

    return this.http.post(apiRoot, item, this.httpOptions).pipe(map(res => {

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

    let apiRoot = this.apiRoot + 'items/' + id;

    return this.http.delete(apiRoot, this.httpOptions).pipe(map(res => {

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