import { Thing } from '../../services/data.service'
import { nanoid } from 'nanoid'

export interface IThingState {
  things: Thing[]
}

export const initialThingsState: IThingState = {
  things: [
    {
      id: nanoid(),
      name: 'Book',
      volume: 600
    },
    {
      id: nanoid(),
      name: 'TV',
      volume: 32_000
    }
  ]
}
