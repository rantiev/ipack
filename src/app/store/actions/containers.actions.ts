import { Action } from '@ngrx/store'
import { Container, Thing } from '../../services/data.service'

export enum EContainersActions {
  AddContainer = '[Container] Add Container',
  EditContainer = '[Container] Edit Container',
  RemoveContainer = '[Container] Remove Container',
  FillContainer = '[Container] Fill Container',
  RemoveItem = '[Container] Remove Item from Container'
}

export class AddContainer implements Action {
  public readonly type = EContainersActions.AddContainer
  constructor(public payload: Container) {}
}

export class EditContainer implements Action {
  public readonly type = EContainersActions.EditContainer
  constructor(public payload: Container) {}
}

export class RemoveContainer implements Action {
  public readonly type = EContainersActions.RemoveContainer
  constructor(public payload: Container) {}
}

export class FillContainer implements Action {
  public readonly type = EContainersActions.FillContainer
  constructor(public payload: { container: Container; thing: Thing }) {}
}

export class RemoveItem implements Action {
  public readonly type = EContainersActions.RemoveItem
  constructor(public payload: Thing) {}
}

export type ContainerActions =
  | AddContainer
  | EditContainer
  | RemoveContainer
  | FillContainer
  | RemoveItem
