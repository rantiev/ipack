import { Component, Input } from '@angular/core'
import { ModalController } from '@ionic/angular'

@Component({
  selector: 'app-addition-modal',
  templateUrl: './addition-modal.component.html',
  styleUrls: ['./addition-modal.component.scss']
})
export class AdditionModalComponent {
  @Input() modalType: 'container' | 'thing'
  name: string
  volume: number

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel')
  }

  confirm() {
    return this.modalCtrl.dismiss(this.modalType, 'confirm')
  }

  submit() {}
}
