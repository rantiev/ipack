import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { DataService, Container } from '../services/data.service'
import { DndDropEvent } from 'ngx-drag-drop'

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainersComponent implements OnInit {
  constructor(public data: DataService) {}

  ngOnInit() {
    this.data.containers.subscribe((d) => {
      console.log(d)
    })
  }

  onDrop(event: DndDropEvent, container: Container) {
    const thing = event.data.thing

    if (thing.containerId) {
      const oldContainer = this.data.containers.getValue().find((el) => el.id === thing.containerId)

      if (oldContainer) {
        oldContainer.things = oldContainer.things.filter((el) => el.id !== thing.id)
        this.data.updateContainer(oldContainer)
      }
    }

    container.things.push(thing)
    thing.containerId = container.id

    this.data.updateContainer(container)
    this.data.updateThing(thing)
  }
}
