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

    case EThingsActions.OnContainerRemoved: {
      let things = cloneDeep(state.things)

      if (action.payload.shouldRemoveContent) {
        const childIds = action.payload.container.children.map((el) => el.id)

        return {
          ...state,
          things: things.filter((el) => !childIds.includes(el.id))
        }
      }

      return {
        ...state,
        things: things.map((el) => {
          if (el.parentId === action.payload.container.id) {
            el.parentId = ''
          }

          return el
        })
      }
    }

    default:
      return state
  }
}
