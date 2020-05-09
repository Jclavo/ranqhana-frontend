import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class CustomValidator {

  // static validCharacters = /[^\s\w,.:&\/()+%'`@-]/;
  // static validNumbers = /^\d+$/;
  static validNumbers = /^[1-9]+[0-9]*$/;
  static validDecimalNumbers = /^[1-9]+[0-9]*(?:\.[0-9]{1,2})*$/;

  constructor() { }

  static validatePositiveNumbers(control: AbstractControl): { [key: string]: any } | null {

    const valid = CustomValidator.validNumbers.test(control.value)
    
    return valid
    ? null
    : { invalidPositiveNumber: true }

  }

  static validatePositiveDecimalNumbers(control: AbstractControl): { [key: string]: any } | null {

    const valid = CustomValidator.validDecimalNumbers.test(control.value)
    
    return valid
    ? null
    : { invalidPositiveNumber: true }

  }


}
