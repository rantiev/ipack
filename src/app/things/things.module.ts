import { NgModule } from '@angular/core'

import { ThingsListComponent } from './things-list/things-list.component'
import { ThingsSectionComponent } from './things-section/things-section.component'
import { SharedComponentsModule } from '../_shared/components/shared-components.module'

@NgModule({
  imports: [SharedComponentsModule],
  declarations: [ThingsListComponent, ThingsSectionComponent],
  exports: [ThingsListComponent, ThingsSectionComponent]
})
export class ThingsComponentModule {}
