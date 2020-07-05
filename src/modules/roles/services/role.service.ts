import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";

//ENVIRONMENT
import { environment } from "../../../environments/environment";

//Models
import { Role } from '../models';
import { Response, SearchOptions } from '@modules/utility/models';

//SERVICES
import { AuthService } from '@modules/auth/services';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  static service: string = 'roles/'
  private apiRoot: string = environment.apiURLTaapaq + RoleService.service;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }


  getByProject(project_id: number): Observable<Response> {

    let apiRoot = this.apiRoot + 'projects/' + project_id;

    return this.http.get(apiRoot, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      response.result = resultRAW.result?.map((data: any) => {

        let role = new Role();
        role.id = data.id;
        role.name = data.nickname;

        return role;
      });

      response.records = resultRAW.records;

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }
}
