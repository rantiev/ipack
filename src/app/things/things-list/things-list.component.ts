import { Component, Input } from '@angular/core'
import { Store } from '@ngrx/store'
import { IAppState } from '../../_shared/store/state/app.state'
import { AlertController, ModalController } from '@ionic/angular'
import { RemoveThing } from '../../_shared/store/actions/things.actions'
import { AdditionModalComponent } from '../../_shared/modals/addition-modal/addition-modal.component'
import { generateDraggableData } from '../../_shared/utils/global'
import { IThing } from '../../_shared/entities/thing'

type TComponentSize = 'small' | 'default'

@Component({
  selector: 'app-things-list',
  templateUrl: './things-list.component.html',
  styleUrls: ['./things-list.component.scss']
})
export class ThingsListComponent {
  @Input() size: TComponentSize = 'default'
  @Input() data: IThing[]
  @Input() editMode?: boolean = false

  constructor(
    private store: Store<IAppState>,
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  generateDraggableData(thing: IThing) {
    return generateDraggableData(thing)
  }

  async onEditThing(thing: IThing) {
    const modal = await this.modalController.create({
      component: AdditionModalComponent,
      componentProps: {
        modalType: 'thing',
        data: thing
      }
    })
    modal.present()

    await modal.onWillDismiss()
  }

  async onRemoveThing(thing: IThing) {
    await this.presentAlert(thing)
  }

  async presentAlert(thing: IThing) {
    const alert = await this.alertController.create({
      header: 'IThing removal',
      message: 'Do you really want to remote this thing?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.store.dispatch(new RemoveThing(thing))
          }
        }
      ]
    })

    await alert.present()
  }
}
