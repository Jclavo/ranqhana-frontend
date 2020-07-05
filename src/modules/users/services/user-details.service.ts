import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";

//ENVIRONMENT
import { environment } from "../../../environments/environment";

//Models
import { User } from '../models';
import { Response, SearchOptions } from '@modules/utility/models';

//SERVICES
import { AuthService } from '@modules/auth/services';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  static service: string = 'user-details/'
  private apiRoot: string = environment.apiURLTaapaq + UserDetailsService.service;
  
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }


  create(user: User): Observable<Response> {

    let apiRoot = this.apiRoot;

    return this.http.post(apiRoot, user, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;
      if(resultRAW.result){

        let user = new User();
        user.user_detail_id = resultRAW.result?.id;
        response.result = user

      }
      

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }
}
