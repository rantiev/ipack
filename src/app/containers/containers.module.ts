import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { IonicModule } from '@ionic/angular'

import { ContainersComponent } from './containers.component'
import { DndModule } from 'ngx-drag-drop'
import { ThingsComponentModule } from '../things/things.module'

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule, DndModule, ThingsComponentModule],
  declarations: [ContainersComponent],
  exports: [ContainersComponent]
})
export class ContainersComponentModule {}
