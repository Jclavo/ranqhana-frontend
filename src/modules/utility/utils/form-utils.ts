import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

//models
import { Mask } from '../models';

@Injectable({
    providedIn: 'root'
})

export class FormUtils {

    static getFormError(form: any): Array<string> {

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

    static moveFormValuesToModel(formValues: any, model: any) {
        for (const key in model) {
            if (formValues.hasOwnProperty(key)) {
                model[key] = formValues[key];
            }
        }
        return model;
    }

    static moveModelValuesToForm(form: any, model: any) {
        for (const key in model) {
            if (form.value.hasOwnProperty(key)) {
                // form.value[key] = model[key];
                form.controls[key].setValue(model[key]);
            }
        }
        return form;
    }

    static getMaskValidationByCountry(countryCode: string): Mask{
        let maskByCountry = new Mask();
        switch (countryCode) {
            case '55':
              console.log('I am brazil');
              maskByCountry.identification = '000.000.000-00';
              maskByCountry.prefixPhone = '+55 ';
              // this.maskPhone='(0{2}) 0{5}-0{4}'
              maskByCountry.phone = '(00) 00000-0000'
              break;
            case '51':
              console.log('I am Peru');
              maskByCountry.identification = '00000000';
              maskByCountry.prefixPhone ='+51 ';
              maskByCountry.phone ='0{9}'
              break;
      
            default:
              break;
          }

        return maskByCountry;

    }

}