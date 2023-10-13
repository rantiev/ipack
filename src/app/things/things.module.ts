import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { IonicModule } from '@ionic/angular'

import { ThingsComponent } from './things.component'
import { DndModule } from 'ngx-drag-drop'

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule, DndModule],
  declarations: [ThingsComponent],
  exports: [ThingsComponent]
})
export class ThingsComponentModule {}
