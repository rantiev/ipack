import { Pipe, PipeTransform } from '@angular/core'
import { IThing } from '../entities/thing'
import { isContainer, TContent } from '../entities/container'

@Pipe({
  name: 'filterThings'
})
export class FilterThingsPipe implements PipeTransform {
  transform(items: any): IThing[] {
    if (!items?.length) return []

    return items.filter((el: any) => isContainer(el) === false)
  }
}
