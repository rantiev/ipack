import { Action } from '@ngrx/store'

export enum EOptionsActions {
  ToggleEditMode = '[Options] Toggle edit mode'
}

export class ToggleEditMode implements Action {
  public readonly type = EOptionsActions.ToggleEditMode
  constructor(public payload: boolean) {}
}

export type OptionsActions = ToggleEditMode
