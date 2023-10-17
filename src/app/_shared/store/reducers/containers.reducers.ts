import { IContainerState, initialContainersState } from '../state/containers.state'
import { ContainerActions, EContainersActions } from '../actions/containers.actions'
import { cloneDeep } from 'lodash'
import { IContainer, isContainer, TContent } from '../../entities/container'

export const containersReducers = (
  state = initialContainersState,
  action: ContainerActions
): IContainerState => {
  switch (action.type) {
    /*case EContainersActions.GetContainersSuccess:
      return {
        ...state,
        containers: action.payload
      }*/

    case EContainersActions.AddContainerSuccess:
      return {
        ...state,
        containers: [...state.containers, action.payload]
      }

    case EContainersActions.EditContainerSuccess: {
      const container = cloneDeep(action.payload)

      return {
        ...state,
        containers: state.containers.map((el) => (el.id === container.id ? container : el))
      }
    }

    case EContainersActions.RemoveContainerSuccess: {
      const containers = cloneDeep(state.containers)
      const container = action.payload.container

      if (action.payload.shouldRemoveContent) {
        const idsToRemove = [container.id, ...container.children.map((el) => el.id)]

        return {
          ...state,
          containers: [...containers.filter((el) => !idsToRemove.includes(el.id))]
        }
      }

      container.children.forEach((child) => {
        updateContainerParentId(containers, child.id, '')
      })

      return {
        ...state,
        containers: [...containers.filter((el) => el.id !== container.id)]
      }
    }

    case EContainersActions.UpdateParent: {
      const containers = cloneDeep(state.containers)
      const container = action.payload.content

      updateContainerParentId(containers, container.id, action.payload.parentId)

      return {
        ...state,
        containers
      }
    }

    case EContainersActions.RemoveParent: {
      const containers = cloneDeep(state.containers)
      const container = action.payload.content

      updateContainerParentId(containers, container.id, '')

      return {
        ...state,
        containers
      }
    }

    case EContainersActions.FillContainerSuccess: {
      const containers = cloneDeep(state.containers)
      const content = cloneDeep(action.payload.content)

      // FIXME: Better to take parent IF from event, but in event data parent ID always missing
      /*if (content.parentId) {
        const oldContainer = containers.find((el) => el.id === content.parentId)

        if (oldContainer) {
          oldContainer.children = oldContainer.children.filter((el) => el.id !== content.id)
          updateContainerVolume(containers, oldContainer, -content.volume)
        }
      }*/
      searchAndRemoveChildContainer(containers, content)

      const newContainer = containers.find((el) => el.id === action.payload.container.id)

      if (newContainer) {
        if (!newContainer.children.find((el) => el.id === content.id)) {
          const realObject = isContainer(content)
            ? containers.find((el) => el.id === content.id)
            : content

          if (realObject) {
            newContainer.children = [...newContainer.children, realObject]
          }

          updateContainerVolume(containers, newContainer, content.volume)
        }

        return {
          ...state,
          containers
        }
      } else {
        return state
      }
    }

    case EContainersActions.RemoveItemSuccess: {
      const containers = cloneDeep(state.containers)
      const content = cloneDeep(action.payload.content)

      searchAndRemoveChildContainer(containers, content)

      return {
        ...state,
        containers
      }
    }
    default:
      return state
  }
}

function searchAndRemoveChildContainer(containers: IContainer[], child: TContent): void {
  /*
   * FIXME: Better to take parent ID from event, but in event data parent ID always missing
   * so as a temp fix we search item in state again
   */

  /*if (content.parentId) {
    const oldContainer = containers.find((el) => el.id === content.parentId)

    if (oldContainer) {
      oldContainer.children = oldContainer.children.filter((el) => el.id !== content.id)
      updateContainerVolume(containers, oldContainer, -content.volume)
    }
  }*/
  // So far let's find child in all containers

  containers.forEach((container) => {
    const index = container.children.findIndex((el) => el.id === child.id)

    if (index >= 0) {
      container.children.splice(index, 1)
      updateContainerVolume(containers, container, -child.volume)
    }
  })
}

function updateContainerVolume(
  containers: IContainer[],
  container: IContainer,
  volume: number
): void {
  container.volumeUsed += volume

  // It's enough to update only one parent volume
  /*const parentId = container.parentId

  if (parentId) {
    const parent = containers.find((el) => el.id === parentId)

    if (parent) {
      updateContainerVolume(containers, parent, volume)
    }
  }*/
}

function updateContainerParentId(
  containers: IContainer[],
  containerId: string,
  parentId: string
): void {
  const container = containers.find((el) => el.id === containerId)

  if (container) {
    container.parentId = parentId
  }
}
