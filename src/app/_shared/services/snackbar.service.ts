import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { SNACKBARS_TIMEOUT } from '../constants/global'

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: SNACKBARS_TIMEOUT
    })
  }
}
