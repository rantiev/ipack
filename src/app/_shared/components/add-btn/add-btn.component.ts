import { Component, Input } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { AdditionModalComponent } from '../../modals/addition-modal/addition-modal.component'

@Component({
  selector: 'app-add-btn',
  templateUrl: './add-btn.component.html',
  styleUrls: ['./add-btn.component.scss']
})
export class AddBtnComponent {
  @Input() entity: string
  constructor(public modalCtrl: ModalController) {}

  async openAdditionModal() {
    const modal = await this.modalCtrl.create({
      component: AdditionModalComponent,
      componentProps: {
        modalType: this.entity
      }
    })

    modal.present()
  }
}
