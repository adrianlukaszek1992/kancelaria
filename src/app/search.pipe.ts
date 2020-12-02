import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      const rVal = (val.id.toLocaleLowerCase().includes(args)) || (val.email.toLocaleLowerCase().includes(args));
      return rVal;
    });

  }

}
