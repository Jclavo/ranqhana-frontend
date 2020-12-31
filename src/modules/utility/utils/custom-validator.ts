import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class CustomValidator {

  // static validCharacters = /[^\s\w,.:&\/()+%'`@-]/;
  // static validNumbers = /^\d+$/;
  static validNumbers = /^[1-9]+[0-9]*$/;
  static validStringNumbers = /^[0-9]+[0-9]*$/;
  static validDecimalNumbers = /^[1-9]+[0-9]*(?:\.[0-9]{1,2})*$/;

  constructor() { }

  static validatePositiveNumbers(control: AbstractControl): { [key: string]: any } | null {

    const valid = CustomValidator.validNumbers.test(control.value)

    return valid
      ? null
      : { invalidPositiveNumber: true }

  }

  static validateStringPositiveNumbers(control: AbstractControl): { [key: string]: any } | null {

    const valid = CustomValidator.validStringNumbers.test(control.value)

    return valid
      ? null
      : { invalidPositiveNumber: true }

  }

  static validateDecimalNumbers(control: AbstractControl): { [key: string]: any } | null {

    const valid = CustomValidator.validDecimalNumbers.test(control.value)

    return valid
      ? null
      : { invalidDecimalNumber: true }

  }

  // static validatePassword(control: AbstractControl): { [key: string]: any } | null {

  //   let valid = true;

  //   if(!control.value) valid = true;
  //   // else if (control.value.length < 8) valid = false;
  //   // else if (control.value.length > 45) valid = false;

  //   return valid
  //   ? null
  //   : { invalidPassword: true }

  // }

  static mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }


}
