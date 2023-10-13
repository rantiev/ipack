import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatCommonModule } from '@angular/material/core'
import { StoreModule, ActionReducer, MetaReducer, Action } from '@ngrx/store'
import { appReducers } from './store/reducers/app.reducers'
import { merge } from 'lodash'

const LOCALSTORAGE_KEY = '__iPack_storage__'

export function storageMetaReducer<S, A extends Action = Action>(reducer: ActionReducer<S, A>) {
  return function (state: S, action: A): S {
    const nextState = reducer(state, action)
    const localStorageItem = localStorage.getItem(LOCALSTORAGE_KEY)
    const savedState = localStorageItem ? JSON.parse(localStorageItem) : {}

    if (action.type === '@ngrx/store/init') {
      merge(nextState, savedState)
    } else if (savedState) {
      merge(savedState, nextState)
    }

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(nextState))

    return nextState
  }
}

export const metaReducers: MetaReducer<any>[] = [storageMetaReducer]

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    MatCommonModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(appReducers, { metaReducers })
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {}
