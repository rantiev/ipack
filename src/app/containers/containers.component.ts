import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { DataService, Container, Thing } from '../services/data.service'
import { DndDropEvent } from 'ngx-drag-drop'
import { select, Store } from '@ngrx/store'
import { selectContainers } from '../store/selectors/containers.selector'
import { IAppState } from '../store/state/app.state'
import { PutThingToContainer, RemoveThing } from '../store/actions/things.actions'
import { FillContainer, RemoveContainer } from '../store/actions/containers.actions'
import { AdditionModalComponent } from '../modals/addition-modal/addition-modal.component'
import { AlertController, ModalController } from '@ionic/angular'

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainersComponent {
  @Input() editMode?: boolean
  containers$ = this.store.pipe(select(selectContainers))

  constructor(
    public data: DataService,
    public store: Store<IAppState>,
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  onDrop(event: DndDropEvent, container: Container) {
    const thing = event.data.thing

    if (container.volumeUsed + thing.volume > container.volume) {
      this.presentArgueAlert(container, thing)
      return
    }

    this.store.dispatch(new FillContainer({ container, thing }))
    this.store.dispatch(new PutThingToContainer({ container, thing }))
  }

  async onEditContainer(container: Container) {
    const modal = await this.modalController.create({
      component: AdditionModalComponent,
      componentProps: {
        modalType: 'container',
        data: container
      }
    })
    modal.present()

    await modal.onWillDismiss()
  }

  async onRemoveContainer(container: Container) {
    await this.presentAlert(container)
  }

  async presentArgueAlert(container: Container, thing: Thing) {
    const alert = await this.alertController.create({
      header: 'Volume exceeded',
      message: `Can\'t place ${thing.name} to ${container.name}`,
      buttons: [
        {
          text: 'OK - I will find another!',
          role: 'ok'
        }
      ]
    })

    await alert.present()
  }

  async presentAlert(container: Container) {
    const alert = await this.alertController.create({
      header: 'Container removal',
      message: 'Do you really want to remote this container?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.store.dispatch(new RemoveContainer(container))
          }
        }
      ]
    })

    await alert.present()
  }

  getProgressColor(p: number): string {
    return p <= 0.5 ? 'success' : p <= 0.85 ? 'warning' : 'danger'
  }
}
