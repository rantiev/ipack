import { Component, OnInit } from '@angular/core'
import { ModalController, RefresherCustomEvent } from '@ionic/angular'
import { AdditionModalComponent } from '../modals/addition-modal/addition-modal.component'
import { DataService, Thing } from '../services/data.service'
import { BehaviorSubject } from 'rxjs'
import { DndDropEvent } from 'ngx-drag-drop'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  public things: BehaviorSubject<Thing[]>
  constructor(
    public modalCtrl: ModalController,
    public data: DataService
  ) {}

  ngOnInit() {
    this.things = this.data.getThings()
  }

  refresh(ev: any) {
    setTimeout(() => {
      ;(ev as RefresherCustomEvent).detail.complete()
    }, 3000)
  }

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
      const oldContainer = this.data.containers.getValue().find((el) => el.id === thing.containerId)

      if (oldContainer) {
        oldContainer.things = oldContainer.things.filter((el) => el.id !== thing.id)
        this.data.updateContainer(oldContainer)
      }
    }

    thing.containerId = ''

    this.data.updateThing(thing)
  }
}
