import { Pipe, PipeTransform } from '@angular/core'
import { IThing } from '../entities/thing'
import { IContainer, isContainer } from '../entities/container'

export interface IDraggableData {
  data: IThing | IContainer
  effectAllowed: boolean
  disable: boolean
  handle: boolean
  type: 'container' | 'thing'
}

@Pipe({
  name: 'draggableData'
})
export class DraggableDataPipe implements PipeTransform {
  transform(data: IThing | IContainer): IDraggableData {
    return {
      data,
      effectAllowed: true,
      disable: false,
      handle: false,
      type: isContainer(data) ? 'container' : 'thing'
    }
  }
}
