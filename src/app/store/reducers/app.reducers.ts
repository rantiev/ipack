import { ActionReducerMap } from '@ngrx/store'
import { IAppState } from '../state/app.state'
import { containersReducers } from './containers.reducers'
import { thingsReducers } from './things.reducers'
import { optionsReducers } from './options.reducers'

export const appReducers: ActionReducerMap<IAppState, any> = {
  containers: containersReducers,
  things: thingsReducers,
  options: optionsReducers
}
