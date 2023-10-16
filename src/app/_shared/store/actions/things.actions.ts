import { Action } from '@ngrx/store'
import { ThingDTO } from '../../../things/things.service'
import { IThing } from '../../entities/thing'
import { IContainer } from '../../entities/container'
import { EContainersActions } from './containers.actions'

export enum EThingsActions {
  GetThings = '[Thing] Get Things',
  GetThingsSuccess = '[Thing] Get Things success',
  GetThingsError = '[Thing] Get Things error',
  AddThing = '[Thing] Add Thing',
  AddThingSuccess = '[Thing] Add Thing success',
  AddThingError = '[Thing] Add Thing error',
  EditThing = '[Thing] Edit Thing',
  EditThingSuccess = '[Thing] Edit Thing success',
  EditThingError = '[Thing] Edit Thing error',
  RemoveThing = '[Thing] Remove Thing',
  RemoveThingSuccess = '[Thing] Remove Thing success',
  RemoveThingError = '[Thing] Remove Thing error',
  UpdateParent = '[Thing] Update parent'
}

export class GetThings implements Action {
  public readonly type = EThingsActions.GetThings
}

export class GetThingsSuccess implements Action {
  public readonly type = EThingsActions.GetThingsSuccess
  constructor(public payload: IThing[]) {}
}

export class GetThingsError implements Action {
  public readonly type = EThingsActions.GetThingsError
}

export class AddThing implements Action {
  public readonly type = EThingsActions.AddThing
  constructor(public payload: ThingDTO) {}
}

export class AddThingSuccess implements Action {
  public readonly type = EThingsActions.AddThingSuccess
  constructor(public payload: IThing) {}
}

export class AddThingError implements Action {
  public readonly type = EThingsActions.AddThingError
}

export class EditThing implements Action {
  public readonly type = EThingsActions.EditThing
  constructor(public payload: IThing) {}
}

export class EditThingSuccess implements Action {
  public readonly type = EThingsActions.EditThingSuccess
  constructor(public payload: IThing) {}
}

export class EditThingError implements Action {
  public readonly type = EThingsActions.EditThingError
}

export class RemoveThing implements Action {
  public readonly type = EThingsActions.RemoveThing
  constructor(public payload: IThing) {}
}

export class RemoveThingSuccess implements Action {
  public readonly type = EThingsActions.RemoveThingSuccess
  constructor(public payload: IThing) {}
}

export class RemoveThingError implements Action {
  public readonly type = EThingsActions.RemoveThingError
}

export class UpdateThingParent implements Action {
  public readonly type = EThingsActions.UpdateParent
  constructor(public payload: { content: IThing; parentId: string }) {}
}

export type ThingsActions =
  | GetThings
  | GetThingsSuccess
  | GetThingsError
  | AddThing
  | AddThingSuccess
  | AddThingError
  | EditThing
  | EditThingSuccess
  | EditThingError
  | RemoveThing
  | RemoveThingSuccess
  | RemoveThingError
  | UpdateThingParent
