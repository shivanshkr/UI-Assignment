import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gB',
})
export class GBPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return (
      value.slice(0, -2) + ' ' + value.substring(value.length - 2).toUpperCase()
    );
  }
}
