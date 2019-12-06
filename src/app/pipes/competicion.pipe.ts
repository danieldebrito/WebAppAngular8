import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'competicion'
})
export class CompeticionPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    if (value === 0) {
      return '';
    }

    return 'Competicion';
  }

}
