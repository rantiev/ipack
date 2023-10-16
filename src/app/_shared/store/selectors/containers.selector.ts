import { createSelector } from '@ngrx/store'
import { IAppState } from '../state/app.state'
import { IContainerState } from '../state/containers.state'

const _selectContainers = (state: IAppState) => state.containers

export const selectContainers = createSelector(
  _selectContainers,
  (state: IContainerState) => state.containers
)
