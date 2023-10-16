import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'

import { HeaderComponent } from '../../_shared/components/header/header.component'
import { AddBtnComponent } from './add-btn/add-btn.component'
import { ModalsModule } from '../modals/modals.module'
import { PipesModule } from '../pipes/pipes.module'
import { DndModule } from 'ngx-drag-drop'
import { SectionTitleComponent } from './section-title/section-title.component'

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ModalsModule, PipesModule, DndModule],
  declarations: [HeaderComponent, AddBtnComponent, SectionTitleComponent],
  exports: [
    CommonModule,
    IonicModule,
    PipesModule,
    ModalsModule,
    DndModule,
    HeaderComponent,
    AddBtnComponent,
    SectionTitleComponent
  ]
})
export class SharedComponentsModule {}
