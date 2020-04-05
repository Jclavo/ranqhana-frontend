import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ValidationErrors } from '@angular/forms';

@Injectable()
export class UtilityService {
    constructor(
        private http: HttpClient,
        //private snackBar: MatSnackBar
    ) { }

    get version$(): Observable<string> {
        return this.http.get('/assets/version', { responseType: 'text' });
    }

    getFormError(form: any): Array<string> {

        let errorsList: Array<string> = [];

        Object.keys(form.controls).forEach(key => {

            const controlErrors: ValidationErrors = form.get(key).errors;
            if (controlErrors != null) {
                Object.keys(controlErrors).forEach(keyError => {
                    // console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
                    errorsList.push(key + ' is ' + keyError);
                });
            }
        });

        return errorsList;
    }

    getMaxSizePagination(screenWidth: number){

        let maxSizePagination = 1;
    
        if(screenWidth <= 400){
          maxSizePagination = 1;
        }else if(screenWidth > 400 && screenWidth <= 500){
          maxSizePagination = 3;
        }else if(screenWidth > 500 && screenWidth <= 700){
          maxSizePagination = 5;
        }else if(screenWidth > 700 && screenWidth <= 1100){
          maxSizePagination = 8;
        }else{
          maxSizePagination = 10;
        }
    
        return maxSizePagination;
      }
}
