import { Component, OnInit, OnDestroy } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { AdditionModalComponent } from '../modals/addition-modal/addition-modal.component'
import { DataService } from '../services/data.service'
import { DndDropEvent } from 'ngx-drag-drop'
import { select, Store } from '@ngrx/store'
import { IAppState } from '../store/state/app.state'
import { selectThings } from '../store/selectors/things.selector'
import { RemoveItem } from '../store/actions/containers.actions'
import { RemoveThingFromContainer } from '../store/actions/things.actions'
import { selectOptions } from '../store/selectors/options.selector'
import { ToggleEditMode } from '../store/actions/options.actions'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  options$ = this.store.pipe(select(selectOptions))
  things$ = this.store.pipe(select(selectThings))

  constructor(
    public modalCtrl: ModalController,
    public data: DataService,
    public store: Store<IAppState>
  ) {}

  /*

  getContainers(): Containers[] {
    return this.data.containers();
  }*/

  async openAdditionModal(modalType: string) {
    const modal = await this.modalCtrl.create({
      component: AdditionModalComponent,
      componentProps: {
        modalType
      }
    })
    modal.present()

    const { data, role } = await modal.onWillDismiss()

    if (role === 'confirm') {
      console.log(`Hello, ${data}!`)
    }
  }

  onDrop(event: DndDropEvent) {
    const thing = event.data.thing

    if (thing.containerId) {
      this.store.dispatch(new RemoveItem(thing))
      this.store.dispatch(new RemoveThingFromContainer(thing))
    }
  }

  onEditModeToggle(event: boolean) {
    this.store.dispatch(new ToggleEditMode(event))
  }
}
