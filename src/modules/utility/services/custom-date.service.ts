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

    let localDate = new Date(date);

    return (localDate.getDate() < 10 ? '0' + localDate.getDate() : localDate.getDate()) + DELIMITER +
      (localDate.getMonth() < 10 ? '0' + localDate.getMonth() : localDate.getMonth()) + DELIMITER +
      localDate.getFullYear() + ' ' +
      (localDate.getHours() < 10 ? '0' + localDate.getHours() : localDate.getHours()) + ':' +
      (localDate.getMinutes() < 10 ? '0' + localDate.getMinutes() : localDate.getMinutes()) + ':' +
      (localDate.getSeconds() < 10 ? '0' + localDate.getSeconds() : localDate.getSeconds());
  }

  getToday() {
    return this.formatYYYYMMDD(this.ngbCalendar.getToday());
  }


}
