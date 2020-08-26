import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";

//ENVIRONMENT
import { environment } from "../../../environments/environment";

//Models
import { Module } from '../models';
import { Response } from '@modules/utility/models';

//SERVICES
import { AuthService } from '@modules/auth/services';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  static service: string = 'modules/'
  private apiRoot: string = environment.apiURLTaapaq + ModuleService.service;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  getMenu(): Observable<Response> {

    let apiURL = this.apiRoot + 'user';

    return this.http.get(apiURL, this.authService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      response.status = resultRAW.status;
      response.message = resultRAW.message;

      const mapModulesChildren = (responseModule: Module) => {

        let module = new Module();
        module.id = responseModule.id;
        module.name = responseModule.name;
        module.url = responseModule.url;
        module.project_id = responseModule.project_id;
        module.labeled = responseModule.labeled;
        module.parent_id = responseModule.parent_id;

        module.children = responseModule.children?.map(mapModulesChildren);

        return module;

      };

      response.result = resultRAW.result?.map(mapModulesChildren);

      // Filter Menus without taapaq
      response.result =  response.result.filter(function(module: Module) {
        return !module.name.includes("Taapaq");
      });

      return response;

    }));
  }


}
