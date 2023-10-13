import { initialOptionsState, IOptionsState } from '../state/options.state'
import { EOptionsActions, OptionsActions } from '../actions/options.actions'
import { cloneDeep } from 'lodash'

export const optionsReducers = (
  state = initialOptionsState,
  action: OptionsActions
): IOptionsState => {
  switch (action.type) {
    case EOptionsActions.ToggleEditMode:
      const options = cloneDeep(state.options)
      options.editMode = !options.editMode

      return {
        ...state,
        options
      }
    default:
      return state
  }
}
