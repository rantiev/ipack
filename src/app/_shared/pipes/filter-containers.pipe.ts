import { Pipe, PipeTransform } from '@angular/core'
import { IContainer, isContainer, TContent } from '../entities/container'

@Pipe({
  name: 'filterContainers'
})
export class FilterContainersPipe implements PipeTransform {
  transform(items: any): IContainer[] {
    if (!items?.length) return []

    return items.filter((el: any) => isContainer(el) === true)
  }
}
