import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

//models
import { Mask } from '../models';
import { PersonType } from '@modules/person-types/models';

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

    static getFormValue(form: FormGroup, fieldName: string) {
        return form.value[fieldName];
    }

    static setFormValue(form: FormGroup, fieldName: string, value: any): FormGroup {
        form.controls[fieldName].setValue(value);
        return form;
    }

    // this.maskPhone='(0{2}) 0{5}-0{4}'
    static getMaskValidationByCountry(countryCode: string, personType: number): Mask {
        let maskByCountry = new Mask();
        personType = Number(personType);
        switch (countryCode) {
            case '55':
                maskByCountry.prefixPhone = '+' + countryCode + ' ';
                maskByCountry.phone = '(00) 00000-0000'
                switch (personType) {
                    case PersonType.getForNatural():
                        maskByCountry.identification = '000.000.000-00';
                        break;
                    case PersonType.getForJuridical():
                        maskByCountry.identification = '00.000.000/0000-00';
                        break;
                }
                break;
            case '51':
                maskByCountry.prefixPhone = '+' + countryCode + ' ';
                maskByCountry.phone = '0{9}'
                switch (personType) {
                    case PersonType.getForNatural():
                        maskByCountry.identification = '00000000';
                        break;
                    case PersonType.getForJuridical():
                        maskByCountry.identification = '0000000000';
                        break;
                }
                break;

            default:
                break;
        }

        return maskByCountry;
    }


    customToFixed(value: number) {
        if (typeof value == 'number') {
            return value?.toFixed(2);
        }
        return value;
    }

    customToFixedIntegerDecimal(value: number) {

        if (typeof value == 'number') {
            if (Number.isInteger(value)) {
                return value?.toFixed();
            } else {
                this.customToFixed(value);
            }
        }
        return value;

    }

}