import { Component, Input } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { Container, DataService, Thing } from '../../services/data.service'
import { nanoid } from 'nanoid'
import { SnackBarService } from '../../services/snackbar.services'

@Component({
  selector: 'app-addition-modal',
  templateUrl: './addition-modal.component.html',
  styleUrls: ['./addition-modal.component.scss']
})
export class AdditionModalComponent {
  @Input() modalType: 'container' | 'thing'
  name: string
  volume: number

  constructor(
    private modalCtrl: ModalController,
    private data: DataService,
    private snackService: SnackBarService
  ) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel')
  }

  confirm() {
    return this.modalCtrl.dismiss(this.modalType, 'confirm')
  }

  submit() {
    const thing: Thing = {
      id: nanoid(),
      name: this.name,
      volume: this.volume
    }

    if (this.modalType === 'container') {
      const container: Container = Object.assign(
        {
          volumeUsed: 0,
          things: []
        },
        thing
      )

      this.data.addContainer(container)
    } else {
      this.data.addThing(thing)
    }

    this.snackService.openSnackBar(`${this.name} was added`, '')
  }
}
