import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {

  // static validCharacters = /[^\s\w,.:&\/()+%'`@-]/;
  // static validNumbers = /^\d+$/;
  static validNumbers = /^[1-9]+[0-9]*$/;

  constructor() { }

  static validatePositiveNumbers(control: AbstractControl): { [key: string]: any } | null {

    const valid = CustomValidatorService.validNumbers.test(control.value)
    
    return valid
    ? null
    : { invalidPositiveNumber: true }

  }


}
