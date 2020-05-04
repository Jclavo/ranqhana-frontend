import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

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

}