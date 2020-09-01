import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ValidationErrors } from '@angular/forms';

//services
import { LanguageService } from "../services/language.service";

//models
import { FormMessage } from "../models";

@Injectable()
export class UtilityService {
  constructor(
    private http: HttpClient,
    private languageService: LanguageService
  ) { }

  get version$(): Observable<string> {
    return this.http.get('/assets/version', { responseType: 'text' });
  }

  getFormError(form: any): Array<FormMessage> {

    let errorsList: Array<FormMessage> = [];

    Object.keys(form.controls).forEach(key => {

      const controlErrors: ValidationErrors = form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          // console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          // errorsList.push(key + ' is ' + keyError);
          let verb: boolean = false;
          let characters: number = 0;
          switch (keyError) {
            case 'required':
              keyError = this.languageService.getI18n('form.required');
              verb = true;
              break;
            case 'email':
              keyError = this.languageService.getI18n('form.email');
              break;
            case 'invalidPositiveNumber':
              keyError = this.languageService.getI18n('form.invalidPositiveNumber');
              break;
            case 'mustMatch':
                keyError = this.languageService.getI18n('form.mustMatch');
                break;
            case 'mask':
                keyError = this.languageService.getI18n('form.mask');
                break;
            case 'minlength':
              characters = controlErrors[keyError].requiredLength
              keyError = this.languageService.getI18n('form.minlength');
              break;

            default:
              break;
          }

          let formMessage = new FormMessage;
          formMessage.key = key;
          verb ? formMessage.verb = this.languageService.getI18n('form.is') : null;
          formMessage.keyMessage = keyError;
          formMessage.characters = characters;

          errorsList.push(formMessage);
        });
      }
    });

    return errorsList;
  }

  getMaxSizePagination(screenWidth: number) {

    let maxSizePagination = 1;

    if (screenWidth <= 400) {
      maxSizePagination = 1;
    } else if (screenWidth > 400 && screenWidth <= 500) {
      maxSizePagination = 3;
    } else if (screenWidth > 500 && screenWidth <= 700) {
      maxSizePagination = 5;
    } else if (screenWidth > 700 && screenWidth <= 1100) {
      maxSizePagination = 8;
    } else {
      maxSizePagination = 10;
    }

    return maxSizePagination;
  }
}
