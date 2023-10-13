import { IContainerState, initialContainersState } from './containers.state'
import { initialThingsState, IThingState } from './things.state'
import { initialOptionsState, IOptionsState } from './options.state'

export interface IAppState {
  containers: IContainerState
  things: IThingState
  options: IOptionsState
}

export const initialAppState: IAppState = {
  containers: initialContainersState,
  things: initialThingsState,
  options: initialOptionsState
}

export function getInitialState(): IAppState {
  return initialAppState
}
