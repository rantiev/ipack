import { IThing } from '../entities/thing'
import { IContainer, isContainer } from '../entities/container'

export function generateDraggableData(data: IThing | IContainer) {
  return {
    data,
    effectAllowed: true,
    disable: false,
    handle: false,
    type: isContainer(data) ? 'container' : 'thing'
  }
}

export function getProgressColor(p: number): string {
  return p <= 0.5 ? 'success' : p <= 0.85 ? 'warning' : 'danger'
}
