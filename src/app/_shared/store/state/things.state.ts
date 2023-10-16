import { nanoid } from 'nanoid'
import { IThing } from '../../entities/thing'

export interface IThingState {
  things: IThing[]
}

export const initialThingsState: IThingState = {
  things: []
}
