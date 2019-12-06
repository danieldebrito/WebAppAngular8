import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enPromo'
})
export class EnPromoPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value === 0) {
      return '';
    }

    return 'Competicion';
  }


}
