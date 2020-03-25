import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isSelected'
})
export class IsSelectedPipe implements PipeTransform {

  transform(status: string, selectedStatuses: string[], refresh:boolean): unknown {
    return selectedStatuses.includes(status);
  }

}
