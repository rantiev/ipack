import { IContainer } from '../../entities/container'

export interface IContainerState {
  containers: IContainer[]
}

export const initialContainersState: IContainerState = {
  containers: []
}
