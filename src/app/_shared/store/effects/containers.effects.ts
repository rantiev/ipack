import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import {
  AddContainer,
  AddContainerError,
  EContainersActions,
  EditContainer,
  EditContainerSuccess,
  FillContainerSuccess,
  RemoveContainer,
  RemoveContainerSuccess
} from '../actions/containers.actions'
import { map, mergeMap, EMPTY, catchError, of, tap } from 'rxjs'
import { ContainersService } from '../../../containers/containers.service'
import { SnackBarService } from '../../services/snackbar.service'
import { IContainer, isContainer, TContent } from '../../entities/container'
import { IThing } from '../../entities/thing'
import { EThingsActions } from '../actions/things.actions'

@Injectable()
export class ContainersEffects {
  getContainers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EContainersActions.GetContainers),
      mergeMap(() =>
        this.containersService.getAll().pipe(
          map((containers: IContainer[]) => ({
            type: EContainersActions.GetContainersSuccess,
            payload: containers
          })),
          catchError(() => EMPTY)
        )
      )
    )
  )

  addContainer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EContainersActions.AddContainer),
      mergeMap((action: AddContainer) =>
        this.containersService.add(action.payload).pipe(
          map((container: IContainer) => ({
            type: EContainersActions.AddContainerSuccess,
            payload: container
          })),
          catchError(() => of({ type: EContainersActions.AddContainerError }))
        )
      )
    )
  )

  addContainerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EContainersActions.AddContainerSuccess),
        tap(() => {
          this.snackbarService.openSnackBar(`Container was added`, '')
        })
      ),
    { dispatch: false }
  )

  addContainerError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EContainersActions.AddContainerError),
        tap((action: AddContainerError) => {
          this.snackbarService.openSnackBar(`Can't add "${action.payload.name}"`, '')
        })
      ),
    { dispatch: false }
  )

  editContainer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EContainersActions.EditContainer),
      mergeMap((action: EditContainer) =>
        this.containersService.edit(action.payload).pipe(
          map((container: IContainer) => ({
            type: EContainersActions.EditContainerSuccess,
            payload: container
          })),
          catchError(() => of({ type: EContainersActions.EditContainerError }))
        )
      )
    )
  )

  editContainerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EContainersActions.EditContainerSuccess),
        tap((action: EditContainerSuccess) => {
          this.snackbarService.openSnackBar(`Container "${action.payload.name}" was edited`, '')
        })
      ),
    { dispatch: false }
  )

  editContainerError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EContainersActions.EditContainerError),
        tap(() => {
          this.snackbarService.openSnackBar("Can't edit container", '')
        })
      ),
    { dispatch: false }
  )

  deleteContainer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EContainersActions.RemoveContainer),
      mergeMap((action: RemoveContainer) => {
        return this.containersService.remove(action.payload.container).pipe(
          map((container: IContainer) => ({
            type: EContainersActions.RemoveContainerSuccess,
            payload: container
          })),
          catchError(() => of({ type: EContainersActions.RemoveContainerError }))
        )
      })
    )
  )

  deleteContainerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EContainersActions.RemoveContainerSuccess),
      map((action: RemoveContainerSuccess) => {
        this.snackbarService.openSnackBar(
          `Container "${action.payload.container.name}" removed`,
          ''
        )

        return {
          type: EThingsActions.OnContainerRemoved,
          payload: {
            container: action.payload.container,
            shouldRemoveContent: action.payload.shouldRemoveContent
          }
        }
      })
    )
  )

  deleteContainerError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EContainersActions.RemoveContainerError),
        tap(() => {
          this.snackbarService.openSnackBar("Can't remove container", '')
        })
      ),
    { dispatch: false }
  )

  fillContainerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EContainersActions.FillContainerSuccess),
      map((action: FillContainerSuccess) =>
        isContainer(action.payload.content)
          ? {
              type: EContainersActions.UpdateParent,
              payload: { content: action.payload.content, parentId: action.payload.container.id }
            }
          : {
              type: EThingsActions.UpdateParent,
              payload: { content: action.payload.content, parentId: action.payload.container.id }
            }
      )
    )
  )

  removeItemSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EContainersActions.RemoveItemSuccess),
      map((action: FillContainerSuccess) =>
        isContainer(action.payload.content)
          ? {
              type: EContainersActions.RemoveParent,
              payload: { content: action.payload.content, parentId: '' }
            }
          : {
              type: EThingsActions.UpdateParent,
              payload: { content: action.payload.content, parentId: '' }
            }
      )
    )
  )

  constructor(
    private actions$: Actions,
    private containersService: ContainersService,
    private snackbarService: SnackBarService
  ) {}
}
