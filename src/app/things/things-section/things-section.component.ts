import { Component, OnInit } from '@angular/core'
import { DndDropEvent } from 'ngx-drag-drop'
import { RemoveItemSuccess } from '../../_shared/store/actions/containers.actions'
import { select, Store } from '@ngrx/store'
import { selectOptions } from '../../_shared/store/selectors/options.selector'
import { IAppState } from '../../_shared/store/state/app.state'
import { GetThings } from '../../_shared/store/actions/things.actions'
import { selectThings } from '../../_shared/store/selectors/things.selector'

@Component({
  selector: 'app-things-section',
  templateUrl: './things-section.component.html',
  styleUrls: ['./things-section.component.scss']
})
export class ThingsSectionComponent implements OnInit {
  things$ = this.store.pipe(select(selectThings))
  options$ = this.store.pipe(select(selectOptions))

  constructor(public store: Store<IAppState>) {}

  ngOnInit() {
    this.store.dispatch(new GetThings())
  }

  onDrop(event: DndDropEvent) {
    const content = event.data.data
    this.store.dispatch(new RemoveItemSuccess({ content }))
  }
}
