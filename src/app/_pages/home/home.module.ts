import { NgModule } from '@angular/core'

import { HomePage } from './home.page'
import { HomePageRoutingModule } from './home-routing.module'

import { ThingsComponentModule } from '../../things/things.module'
import { ContainersComponentModule } from '../../containers/containers.module'
import { SharedComponentsModule } from '../../_shared/components/shared-components.module'

@NgModule({
  imports: [
    SharedComponentsModule,
    HomePageRoutingModule,
    ThingsComponentModule,
    ContainersComponentModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
