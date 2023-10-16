import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { DndDropEvent } from 'ngx-drag-drop'
import { Store } from '@ngrx/store'
import { IAppState } from '../../_shared/store/state/app.state'
import { RemoveItemSuccess } from '../../_shared/store/actions/containers.actions'
import { IContainer } from '../../_shared/entities/container'
import { IThing } from '../../_shared/entities/thing'

@Component({
  selector: 'app-containers-list',
  templateUrl: './containers-list.component.html',
  styleUrls: ['./containers-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainersListComponent {
  @Input() data: IContainer[]
  @Input() editMode?: boolean
}
