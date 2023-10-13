import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'

import { HomePage } from './home.page'
import { HomePageRoutingModule } from './home-routing.module'

import { ThingsComponentModule } from '../things/things.module'
import { ContainersComponentModule } from '../containers/containers.module'
import { ModalsModule } from '../modals/modals.module'
import { PipesModule } from '../pipes/pipes.module'
import { DndModule } from 'ngx-drag-drop'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThingsComponentModule,
    ContainersComponentModule,
    HomePageRoutingModule,
    ModalsModule,
    PipesModule,
    DndModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
