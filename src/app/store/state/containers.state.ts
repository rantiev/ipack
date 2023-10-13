import { Container } from '../../services/data.service'
import { nanoid } from 'nanoid'

export interface IContainerState {
  containers: Container[]
}

export const initialContainersState: IContainerState = {
  containers: [
    {
      id: nanoid(),
      name: 'Box',
      volume: 1_000,
      volumeUsed: 0,
      things: []
    },
    {
      id: nanoid(),
      name: 'Container',
      volume: 40_000_000,
      volumeUsed: 0,
      things: []
    }
  ]
}
