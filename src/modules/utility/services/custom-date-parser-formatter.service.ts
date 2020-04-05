import { Injectable } from '@angular/core';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

//SERVICE
import { CustomDateService } from "./custom-date.service";

@Injectable({
  providedIn: 'root'
})
export class CustomDateParserFormatterService extends NgbDateParserFormatter {

  constructor(
    private customDateService: CustomDateService,
  ) {
    super();
  }

  parse(value: string): any {
    if (value) {
      let date = this.customDateService.split(value)
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: any): string {
    return this.customDateService.formatDDMMYYYY(date);
  }
}
