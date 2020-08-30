import { Injectable } from '@angular/core';

//Models
import { I18n } from "../models";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  //Language string object.
  private i18ns: Array<I18n> = [];  

  constructor() { }

  setI18n(label: string, value: string){
    let i18n = new I18n();
    i18n.label = label;
    i18n.value = value;
    this.i18ns.push(i18n);
  }

  getI18n(label: string){
    for (let index = 0; index < this.i18ns.length; index++) {
       if(this.i18ns[index].label == label){
         return this.i18ns[index].value;
       }; 
    }
    return '';
  }
}
