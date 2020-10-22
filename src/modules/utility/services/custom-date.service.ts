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

    let day = localDate.getDate();
    let month = localDate.getMonth() + 1;
    let year = localDate.getFullYear();
    let hours = localDate.getHours();
    let minutes = localDate.getMinutes();
    let seconds = localDate.getSeconds();

    return (day < 10 ? '0' + day : day) + DELIMITER +
      (month < 10 ? '0' + month : month) + DELIMITER +
      year + ' ' +
      (hours < 10 ? '0' + hours : hours) + ':' +
      (minutes < 10 ? '0' + minutes : minutes) + ':' +
      (seconds < 10 ? '0' + seconds : seconds);
  }

  formatShortStringDDMMYYYY(date: string, DELIMITER: string = this.DELIMITER) {

    if (!date) return '';

    let localDate = new Date(date);

    let day = localDate.getDate();
    let month = localDate.getMonth() + 1;
    let year = localDate.getFullYear();

    return (day < 10 ? '0' + day : day) + DELIMITER +
      (month < 10 ? '0' + month : month) + DELIMITER +
      year;
  }

  getToday() {
    return this.formatYYYYMMDD(this.ngbCalendar.getToday());
  }

  substractDaysFromToday(days: number) {
    return this.formatYYYYMMDD(this.ngbCalendar.getPrev(this.ngbCalendar.getToday(), 'd', days));
  }

  substractMonthsFromToday(months: number) {
    return this.formatYYYYMMDD(this.ngbCalendar.getPrev(this.ngbCalendar.getToday(), 'm', months));
  }

  validateShortDate(date: string) {

    if (!date) return false;

    let inputDate = new Date(date + 'T00:00:00');
    let todaysDate = new Date();

    if (inputDate.setHours(0, 0, 0, 0) < todaysDate.setHours(0, 0, 0, 0)) {
      return false;
    }

    return true;
  }

  formatDDMMYYYYtoYYYYMMDD(date: string){
    return date.split("-").reverse().join("-");
  }







}
