import { initialThingsState, IThingState } from '../state/things.state'
import { EThingsActions, ThingsActions } from '../actions/things.actions'
import { cloneDeep } from 'lodash'

export const thingsReducers = (state = initialThingsState, action: ThingsActions): IThingState => {
  switch (action.type) {
    case EThingsActions.AddThing:
      return {
        ...state,
        things: [...state.things, action.payload]
      }

    case EThingsActions.EditThing: {
      const thing = cloneDeep(action.payload)

      return {
        ...state,
        things: state.things.map((el) => (el.id === thing.id ? thing : el))
      }
    }

    case EThingsActions.RemoveThing:
      return {
        ...state,
        things: [...state.things.filter((el) => el.id !== action.payload.id)]
      }

    case EThingsActions.PutThingToContainer:
      const things = cloneDeep(state.things)
      const thing = things.find((el) => el.id === action.payload.thing.id)

      if (thing) {
        thing.containerId = action.payload.container.id

        return {
          ...state,
          things
        }
      }

      return state

    case EThingsActions.RemoveThingFromContainer: {
      const things = cloneDeep(state.things)
      const thing = things.find((el) => el.id === action.payload.id)

      if (thing) {
        thing.containerId = ''

        return {
          ...state,
          things
        }
      }

      return state
    }
    default:
      return state
  }
}
