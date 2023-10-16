import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { of, map, tap, mergeMap, catchError } from 'rxjs'
import {
  AddThing,
  EditThing,
  EditThingSuccess,
  EThingsActions,
  OnContainerRemoved,
  RemoveThing,
  RemoveThingSuccess
} from '../actions/things.actions'
import { ThingsService } from '../../../things/things.service'
import { SnackBarService } from '../../services/snackbar.service'
import { IThing } from '../../entities/thing'

@Injectable()
export class ThingsEffects {
  getThings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EThingsActions.GetThings),
      mergeMap(() =>
        this.thingsService.getAll().pipe(
          map((things: IThing[]) => ({
            type: EThingsActions.GetThingsSuccess,
            payload: things
          })),
          catchError(() => of({ type: EThingsActions.GetThingsError }))
        )
      )
    )
  )

  addThing$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EThingsActions.AddThing),
      mergeMap((action: AddThing) =>
        this.thingsService.add(action.payload).pipe(
          map((thing: IThing) => ({
            type: EThingsActions.AddThingSuccess,
            payload: thing
          })),
          catchError(() => of({ type: EThingsActions.AddThingError }))
        )
      )
    )
  )

  addThingSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EThingsActions.AddThingSuccess),
        tap(() => {
          this.snackbarService.openSnackBar('IThing was added', '')
        })
      ),
    { dispatch: false }
  )

  addThingError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EThingsActions.AddThingError),
        tap(() => {
          this.snackbarService.openSnackBar("Can't add thing", '')
        })
      ),
    { dispatch: false }
  )

  editThing$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EThingsActions.EditThing),
      mergeMap((action: EditThing) =>
        this.thingsService.edit(action.payload).pipe(
          map((thing: IThing) => ({
            type: EThingsActions.EditThingSuccess,
            payload: thing
          })),
          catchError(() => of({ type: EThingsActions.EditThingError }))
        )
      )
    )
  )

  editThingSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EThingsActions.EditThingSuccess),
        tap((action: EditThingSuccess) => {
          this.snackbarService.openSnackBar(`Thing "${action.payload.name}" was edited`, '')
        })
      ),
    { dispatch: false }
  )

  editThingError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EThingsActions.EditThingError),
        tap(() => {
          this.snackbarService.openSnackBar("Can't edit thing", '')
        })
      ),
    { dispatch: false }
  )

  deleteThing$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EThingsActions.RemoveThing),
      mergeMap((action: RemoveThing) => {
        return this.thingsService.remove(action.payload).pipe(
          map((thing: IThing) => ({
            type: EThingsActions.RemoveThingSuccess,
            payload: thing
          })),
          catchError(() => of({ type: EThingsActions.RemoveThingError }))
        )
      })
    )
  )

  deleteThingSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EThingsActions.RemoveThingSuccess),
        tap((action: RemoveThingSuccess) => {
          this.snackbarService.openSnackBar(`Thing "${action.payload.name}" removed`, '')
        })
      ),
    { dispatch: false }
  )

  deleteThingError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EThingsActions.RemoveThingError),
        tap(() => {
          this.snackbarService.openSnackBar("Can't remove thing", '')
        })
      ),
    { dispatch: false }
  )

  constructor(
    private actions$: Actions,
    private thingsService: ThingsService,
    private snackbarService: SnackBarService
  ) {}
}
