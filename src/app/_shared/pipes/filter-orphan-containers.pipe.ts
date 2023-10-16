import { Pipe, PipeTransform } from '@angular/core'
import { IContainer } from '../entities/container'

@Pipe({
  name: 'filterOrphanContainers'
})
export class FilterOrphanContainersPipe implements PipeTransform {
  transform(items: IContainer[] | null): IContainer[] {
    if (!items?.length) return []

    return items.filter((el) => !el.parentId)
  }
}
