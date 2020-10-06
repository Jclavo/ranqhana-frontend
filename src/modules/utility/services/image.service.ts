import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, switchMap } from "rxjs/operators";

//ENVIRONMENT
import { environment } from "../../../environments/environment";

//Models
import { Response } from '@modules/utility/models';

//SERVICES
import { AuthService } from '@modules/auth/services';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  static service: string = 'images/';

  private apiRoot: string = environment.apiURLTaapaq + ImageService.service;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  save(image: any): Observable<Response> {

    let apiRoot = this.apiRoot;

    return this.http.post(apiRoot, image, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;
      //response.result = resultRAW.result;
      if (resultRAW.result) {
        response.result = resultRAW.result?.name;
      }

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

}
