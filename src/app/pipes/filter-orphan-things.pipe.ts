import { Pipe, PipeTransform } from '@angular/core'
import { Thing } from '../services/data.service'

@Pipe({
  name: 'filterOrphanThings'
})
export class FilterOrphanThingsPipe implements PipeTransform {
  transform(items: Thing[] | null): Thing[] {
    if (!items?.length) return []

    return items.filter((el) => !el.containerId)
  }
}
