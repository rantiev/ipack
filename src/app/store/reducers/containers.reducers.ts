import { IContainerState, initialContainersState } from '../state/containers.state'
import { ContainerActions, EContainersActions } from '../actions/containers.actions'
import { cloneDeep } from 'lodash'

export const containersReducers = (
  state = initialContainersState,
  action: ContainerActions
): IContainerState => {
  switch (action.type) {
    case EContainersActions.AddContainer:
      return {
        ...state,
        containers: [...state.containers, action.payload]
      }

    case EContainersActions.EditContainer: {
      const container = cloneDeep(action.payload)

      return {
        ...state,
        containers: state.containers.map((el) => (el.id === container.id ? container : el))
      }
    }

    case EContainersActions.RemoveContainer: {
      return {
        ...state,
        containers: [...state.containers.filter((el) => el.id !== action.payload.id)]
      }
    }

    case EContainersActions.FillContainer: {
      const containers = cloneDeep(state.containers)

      const thing = cloneDeep(action.payload.thing)
      const container = containers.find((el) => el.id === action.payload.container.id)

      if (thing.containerId) {
        const oldContainer = containers.find((el) => el.id === thing.containerId)

        if (oldContainer) {
          oldContainer.things = oldContainer.things.filter((el) => el.id !== thing.id)
          oldContainer.volumeUsed -= thing.volume
        }
      }

      if (container) {
        thing.containerId = container.id
        container.things = [...container.things, thing]
        container.volumeUsed += thing.volume

        return {
          ...state,
          containers
        }
      } else {
        return state
      }
    }
    case EContainersActions.RemoveItem: {
      const containers = cloneDeep(state.containers)
      const thing = cloneDeep(action.payload)

      if (thing.containerId) {
        const oldContainer = containers.find((el) => el.id === thing.containerId)

        if (oldContainer) {
          oldContainer.things = oldContainer.things.filter((el) => el.id !== thing.id)
          oldContainer.volumeUsed -= thing.volume
        }
      }

      return {
        ...state,
        containers
      }
    }
    default:
      return state
  }
}
