import { Action, createAction } from '@ngrx/store'
import { ContainerDTO } from '../../../containers/containers.service'
import { IThing } from '../../entities/thing'
import { IContainer, TContent } from '../../entities/container'

export enum EContainersActions {
  GetContainers = '[Container] Get Containers',
  GetContainersSuccess = '[Container] Get Containers success',
  GetContainersError = '[Container] Get Containers error',
  AddContainer = '[Container] Add Container',
  AddContainerSuccess = '[Container] Add Container success',
  AddContainerError = '[Container] Add Container error',
  EditContainer = '[Container] Edit Container',
  EditContainerSuccess = '[Container] Edit Container success',
  EditContainerError = '[Container] Edit Container error',
  RemoveContainer = '[Container] Remove Container',
  RemoveContainerSuccess = '[Container] Remove Container success',
  RemoveContainerError = '[Container] Remove Container error',
  FillContainer = '[Container] Fill Container',
  FillContainerSuccess = '[Container] Fill Container success',
  FillContainerError = '[Container] Fill Container error',
  RemoveItem = '[Container] Remove Item from Container',
  RemoveItemSuccess = '[Container] Remove Item from Container success',
  RemoveItemError = '[Container] Remove Item from Container error',
  UpdateParent = '[Container] Update parent',
  RemoveParent = '[Container] Remove parent'
}

export class GetContainers implements Action {
  public readonly type = EContainersActions.GetContainers
}

export class GetContainersSuccess implements Action {
  public readonly type = EContainersActions.GetContainersSuccess
  constructor(public payload: IContainer[]) {}
}

export class GetContainersError implements Action {
  public readonly type = EContainersActions.GetContainersError
}

export class AddContainer implements Action {
  public readonly type = EContainersActions.AddContainer
  constructor(public payload: ContainerDTO) {}
}

export class AddContainerSuccess implements Action {
  public readonly type = EContainersActions.AddContainerSuccess
  constructor(public payload: IContainer) {}
}

export class AddContainerError implements Action {
  public readonly type = EContainersActions.AddContainerError
  constructor(public payload: IContainer) {}
}

export class EditContainer implements Action {
  public readonly type = EContainersActions.EditContainer
  constructor(public payload: IContainer) {}
}

export class EditContainerSuccess implements Action {
  public readonly type = EContainersActions.EditContainerSuccess
  constructor(public payload: IContainer) {}
}

export class EditContainerError implements Action {
  public readonly type = EContainersActions.EditContainerError
}

export class RemoveContainer implements Action {
  public readonly type = EContainersActions.RemoveContainer
  constructor(public payload: { container: IContainer; shouldRemoveContent: boolean }) {}
}

export class RemoveContainerSuccess implements Action {
  public readonly type = EContainersActions.RemoveContainerSuccess
  constructor(public payload: { container: IContainer; shouldRemoveContent: boolean }) {}
}

export class RemoveContainerError implements Action {
  public readonly type = EContainersActions.RemoveContainerError
}

export class UpdateContainerParent implements Action {
  public readonly type = EContainersActions.UpdateParent
  constructor(public payload: { content: IContainer; parentId: string }) {}
}

export class RemoveContainerParent implements Action {
  public readonly type = EContainersActions.RemoveParent
  constructor(public payload: { content: IContainer; parentId: string }) {}
}

export class FillContainer implements Action {
  public readonly type = EContainersActions.FillContainer
  constructor(public payload: { container: IContainer; content: TContent }) {}
}

export class FillContainerSuccess implements Action {
  public readonly type = EContainersActions.FillContainerSuccess
  constructor(public payload: { container: IContainer; content: TContent }) {}
}

export class FillContainerError implements Action {
  public readonly type = EContainersActions.FillContainerError
}

export class RemoveItem implements Action {
  public readonly type = EContainersActions.RemoveItem
  constructor(public payload: { content: TContent }) {}
}

export class RemoveItemSuccess implements Action {
  public readonly type = EContainersActions.RemoveItemSuccess
  constructor(public payload: { content: TContent }) {}
}

export class RemoveItemError implements Action {
  public readonly type = EContainersActions.RemoveItemError
}

export type ContainerActions =
  | GetContainers
  | GetContainersSuccess
  | GetContainersError
  | AddContainer
  | AddContainerSuccess
  | AddContainerError
  | EditContainer
  | EditContainerSuccess
  | EditContainerError
  | RemoveContainer
  | RemoveContainerSuccess
  | RemoveContainerError
  | UpdateContainerParent
  | RemoveContainerParent
  | FillContainer
  | FillContainerSuccess
  | FillContainerError
  | RemoveItem
  | RemoveItemSuccess
  | RemoveItemError
