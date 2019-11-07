import { Pipe, PipeTransform, Injectable } from '@angular/core';

/**
 * Generated class for the FilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filter',
})
@Injectable()
export class FilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], field: string, value: string): any[] {
    if (!items) return [];
    return items.filter(it => it[field] == value);
  }
}
