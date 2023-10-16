import { initialThingsState, IThingState } from '../state/things.state'
import { EThingsActions, ThingsActions } from '../actions/things.actions'
import { cloneDeep } from 'lodash'

export const thingsReducers = (state = initialThingsState, action: ThingsActions): IThingState => {
  switch (action.type) {
    /*case EThingsActions.GetThingsSuccess:
      return {
        ...state,
        children: action.payload
      }*/

    case EThingsActions.AddThingSuccess:
      return {
        ...state,
        things: [...state.things, action.payload]
      }

    case EThingsActions.EditThingSuccess: {
      const thing = cloneDeep(action.payload)

      return {
        ...state,
        things: state.things.map((el) => (el.id === thing.id ? thing : el))
      }
    }

    case EThingsActions.RemoveThingSuccess:
      return {
        ...state,
        things: [...state.things.filter((el) => el.id !== action.payload.id)]
      }

    case EThingsActions.UpdateParent: {
      const things = cloneDeep(state.things)
      const thing = things.find((el) => el.id === action.payload.content.id)

      if (thing) {
        thing.parentId = action.payload.parentId
      }

      return {
        ...state,
        things
      }
    }

    default:
      return state
  }
}
