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

    // openSnackBar(message: string, action: string = 'OK') {
    //     this.snackBar.open(message, action, {
    //         duration: 2000,
    //     });
    // }
}
