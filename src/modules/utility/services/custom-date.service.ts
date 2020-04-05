import { Injectable } from '@angular/core';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class CustomDateService {

  private DELIMITER = '-';

  constructor(
    private ngbCalendar: NgbCalendar
  ) {
    this.setDelimiter();
  }

  getDelimiter() {
    return this.DELIMITER;
  }

  private setDelimiter() {
    // this.DELIMITER = '-';
  }

  split(date: any, DELIMITER: string = this.DELIMITER) {
    return date.split(DELIMITER)
  }

  formatYYYYMMDD(date: any, DELIMITER: string = this.DELIMITER) {

    if (!date) return '';

    return date.year + DELIMITER +
      (date.month < 10 ? '0' + date.month : date.month) + DELIMITER +
      (date.day < 10 ? '0' + date.day : date.day);

  }

  formatDDMMYYYY(date: any, DELIMITER: string = this.DELIMITER) {

    if (!date) return '';

    return (date.day < 10 ? '0' + date.day : date.day) + DELIMITER +
      (date.month < 10 ? '0' + date.month : date.month) + DELIMITER +
      date.year;
  }

  formatStringDDMMYYYY(date: string, DELIMITER: string = this.DELIMITER) {

    if (!date) return '';

    return date.substring(8,10) + DELIMITER +
           date.substring(5,7) + DELIMITER +
           date.substring(0,4) + ' ' +  date.substring(11,date.length);
  }

  getToday() {
    return this.formatYYYYMMDD(this.ngbCalendar.getToday());
  }


}
