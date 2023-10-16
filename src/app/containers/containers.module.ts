import { NgModule } from '@angular/core'
import { ContainersListComponent } from './containers-list/containers-list.component'
import { ThingsComponentModule } from '../things/things.module'
import { ContainersSectionComponent } from './containers-section/containers-section.component'
import { SharedComponentsModule } from '../_shared/components/shared-components.module'
import { ContainersListItemComponent } from './containers-list-item/containers-list-item.component'

@NgModule({
  imports: [ThingsComponentModule, SharedComponentsModule],
  declarations: [ContainersListComponent, ContainersSectionComponent, ContainersListItemComponent],
  exports: [ContainersListComponent, ContainersSectionComponent, ContainersListItemComponent]
})
export class ContainersComponentModule {}
