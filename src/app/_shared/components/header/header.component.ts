import { Component } from '@angular/core'
import { ToggleEditMode } from '../../store/actions/options.actions'
import { select, Store } from '@ngrx/store'
import { IAppState } from '../../store/state/app.state'
import { selectOptions } from '../../store/selectors/options.selector'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  options$ = this.store.pipe(select(selectOptions))

  constructor(public store: Store<IAppState>) {}

  onEditModeToggle(event: boolean) {
    this.store.dispatch(new ToggleEditMode(event))
  }
}
