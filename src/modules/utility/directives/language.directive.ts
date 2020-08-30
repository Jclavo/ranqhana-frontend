import { Directive, ElementRef } from '@angular/core';

//Services
import { LanguageService } from "../services";

@Directive({
  selector: '[sbLanguage]'
})
export class LanguageDirective {

  constructor(
    public element: ElementRef,
    public languageService: LanguageService) {
  }

  ngOnInit() {
    let ele = this.element.nativeElement;
    for (var i = 0; i < ele.children.length; i++) {
      let id = ele.children[i].getAttribute('id');
      let value = ele.children[i].innerHTML;
      this.languageService.setI18n(id,value);
    }
  }

}
