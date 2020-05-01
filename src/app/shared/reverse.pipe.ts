import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
})
export class ReversePipe implements PipeTransform {
  transform(value: any): any {
    if (value && value.length > 0) {
      return value.split('').reverse().join('');
    } else {
      return value;
    }
  }
}
