import { Pipe, PipeTransform } from '@angular/core'
import { IThing } from '../entities/thing'

@Pipe({
  name: 'filterOrphanThings'
})
export class FilterOrphanThingsPipe implements PipeTransform {
  transform(items: IThing[] | null): IThing[] {
    if (!items?.length) return []

    return items.filter((el) => !el.parentId)
  }
}
