import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

//SERVICE
import { CustomDateService } from "./custom-date.service";


@Injectable({
  providedIn: 'root'
})
export class CustomAdapterService extends NgbDateAdapter<string>  {

  constructor(
    private customDateService: CustomDateService,
  ) {
    super();
  }

  fromModel(value: string | null): any {
    if (value) {
      let date = this.customDateService.split(value);
      return {
        day: parseInt(date[2], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[0], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): any {

    return this.customDateService.formatYYYYMMDD(date);

  }
}
