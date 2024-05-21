import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limit'
})
export class LimitPipe implements PipeTransform {
  transform<T>(items: T[], limit: number): T[] {
    return items.slice(0, limit);
  }
}
