import { Component, Input } from '@angular/core'
import { Thing } from '../services/data.service'
import { Store } from '@ngrx/store'
import { IAppState } from '../store/state/app.state'
import { AlertController, ModalController } from '@ionic/angular'
import { RemoveThing } from '../store/actions/things.actions'
import { AdditionModalComponent } from '../modals/addition-modal/addition-modal.component'

type TComponentSize = 'small' | 'default'

@Component({
  selector: 'app-things',
  templateUrl: './things.component.html',
  styleUrls: ['./things.component.scss']
})
export class ThingsComponent {
  @Input() size: TComponentSize = 'default'
  @Input() data: Thing[]
  @Input() editMode?: boolean = false

  constructor(
    private store: Store<IAppState>,
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  generateDraggableData(thing: Thing) {
    return {
      thing,
      effectAllowed: true,
      disable: false,
      handle: false
    }
  }

  async onEditThing(thing: Thing) {
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

  async onRemoveThing(thing: Thing) {
    await this.presentAlert(thing)
  }

  async presentAlert(thing: Thing) {
    const alert = await this.alertController.create({
      header: 'Thing removal',
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
