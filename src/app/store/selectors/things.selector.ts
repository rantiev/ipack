import { createSelector } from '@ngrx/store'
import { IAppState } from '../state/app.state'
import { IThingState } from '../state/things.state'

const _selectThings = (state: IAppState) => state.things

export const selectThings = createSelector(_selectThings, (state: IThingState) => state.things)
