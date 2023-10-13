import { Component, Input } from '@angular/core'
import { Thing } from '../services/data.service'

type TComponentSize = 'small' | 'default'

@Component({
  selector: 'app-things',
  templateUrl: './things.component.html',
  styleUrls: ['./things.component.scss']
})
export class ThingsComponent {
  @Input() size: TComponentSize = 'default'
  @Input() data: Thing[]

  generateDraggableData(thing: Thing) {
    return {
      thing,
      effectAllowed: true,
      disable: false,
      handle: false
    }
  }
}
