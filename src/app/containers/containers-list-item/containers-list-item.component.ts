import { Component, Input } from '@angular/core'
import { IContainer } from '../../_shared/entities/container'
import { AdditionModalComponent } from '../../_shared/modals/addition-modal/addition-modal.component'
import { IThing } from '../../_shared/entities/thing'
import {
  FillContainerSuccess,
  RemoveContainerSuccess
} from '../../_shared/store/actions/containers.actions'
import { DndDropEvent } from 'ngx-drag-drop'
import { Store } from '@ngrx/store'
import { IAppState } from '../../_shared/store/state/app.state'
import { AlertController, ModalController } from '@ionic/angular'

@Component({
  selector: 'app-containers-list-item',
  templateUrl: './containers-list-item.component.html',
  styleUrls: ['./containers-list-item.component.scss']
})
export class ContainersListItemComponent {
  @Input() container: IContainer
  @Input() editMode?: boolean

  constructor(
    public store: Store<IAppState>,
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  onDrop(event: DndDropEvent, container: IContainer) {
    const content = event.data.data

    if (container.volumeUsed + content.volume > container.volume) {
      this.presentArgueAlert(container, content)
      return
    }

    // If user drags container over itself slighly it tries to be added into itself
    // Considering this as dnd lib issue, fixing with ID check.
    if (container.id === content.id) {
      return
    }

    this.store.dispatch(new FillContainerSuccess({ container, content }))
  }

  async onEditContainer(container: IContainer) {
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

  async onRemoveContainer(container: IContainer) {
    await this.presentAlert(container)
  }

  async presentArgueAlert(container: IContainer, thing: IThing) {
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

  async presentAlert(container: IContainer) {
    const alert = await this.alertController.create({
      header: 'Container removal',
      message: 'Do you really want to remote this container?',
      ...(container.children.length
        ? {
            inputs: [
              {
                label: 'Throw all items away',
                name: 'throwItems',
                type: 'checkbox',
                value: true
              }
            ]
          }
        : {}),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: (alertData) => {
            const shouldRemoveContent = alertData ? alertData[0] : false

            this.store.dispatch(new RemoveContainerSuccess({ container, shouldRemoveContent }))
          }
        }
      ]
    })

    await alert.present()
  }
}
