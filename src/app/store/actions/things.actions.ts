import { Action } from '@ngrx/store'
import { Container, Thing } from '../../services/data.service'

export enum EThingsActions {
  AddThing = '[Thing] Add Thing',
  EditThing = '[Thing] Edit Thing',
  RemoveThing = '[Thing] Remove Thing',
  PutThingToContainer = '[Thing] Put Thing to a Container',
  RemoveThingFromContainer = '[Thing] Remove Thing from a Container'
}

export class AddThing implements Action {
  public readonly type = EThingsActions.AddThing
  constructor(public payload: Thing) {}
}

export class EditThing implements Action {
  public readonly type = EThingsActions.EditThing
  constructor(public payload: Thing) {}
}

export class RemoveThing implements Action {
  public readonly type = EThingsActions.RemoveThing
  constructor(public payload: Thing) {}
}

export class PutThingToContainer implements Action {
  public readonly type = EThingsActions.PutThingToContainer
  constructor(public payload: { thing: Thing; container: Container }) {}
}

export class RemoveThingFromContainer implements Action {
  public readonly type = EThingsActions.RemoveThingFromContainer
  constructor(public payload: Thing) {}
}

export type ThingsActions =
  | AddThing
  | EditThing
  | RemoveThing
  | PutThingToContainer
  | RemoveThingFromContainer
