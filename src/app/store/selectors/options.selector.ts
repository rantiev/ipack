import { createSelector } from '@ngrx/store'
import { IAppState } from '../state/app.state'
import { IThingState } from '../state/things.state'
import { IOptionsState } from '../state/options.state'

const _selectOptions = (state: IAppState) => state.options

export const selectOptions = createSelector(_selectOptions, (state: IOptionsState) => state.options)
