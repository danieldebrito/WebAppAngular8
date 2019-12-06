import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nuevoProducto'
})
export class NuevoProductoPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value === 0) {
      return 'true';
    }

    return 'false';
  }


}
