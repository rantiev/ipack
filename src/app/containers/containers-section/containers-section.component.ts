import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { selectContainers } from '../../_shared/store/selectors/containers.selector'
import { IAppState } from '../../_shared/store/state/app.state'
import { selectOptions } from '../../_shared/store/selectors/options.selector'
import { GetContainers, RemoveItemSuccess } from '../../_shared/store/actions/containers.actions'
import { DndDropEvent } from 'ngx-drag-drop'

@Component({
  selector: 'app-containers-section',
  templateUrl: './containers-section.component.html',
  styleUrls: ['./containers-section.component.scss']
})
export class ContainersSectionComponent implements OnInit {
  containers$ = this.store.pipe(select(selectContainers))
  options$ = this.store.pipe(select(selectOptions))

  constructor(public store: Store<IAppState>) {}

  ngOnInit() {
    this.store.dispatch(new GetContainers())
  }

  onDropOut(event: DndDropEvent) {
    const content = event.data.data

    this.store.dispatch(new RemoveItemSuccess({ content }))
  }
}
