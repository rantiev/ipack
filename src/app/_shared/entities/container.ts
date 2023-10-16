import { IThing } from './thing'

export interface IContainer extends IThing {
  children: (IThing | IContainer)[]
  volumeUsed: number
}

export function isContainer(o: any): o is IContainer {
  return !!o.children
}

export type TContent = IContainer | IThing
