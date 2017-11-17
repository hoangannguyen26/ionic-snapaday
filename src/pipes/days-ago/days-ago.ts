import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DaysAgoPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'daysAgo',
})
export class DaysAgoPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, ...args) {
    let now = new Date();
    let oneDay = 24 * 60 * 60 * 1000;
    let diffDay = Math.round(Math.abs((value.getTime() - now.getTime()) /(oneDay)));
    return diffDay;
  }
}
