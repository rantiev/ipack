import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FilterOrphanThingsPipe } from './filter-orphan-things.pipe'

@NgModule({
  declarations: [FilterOrphanThingsPipe],
  imports: [CommonModule],
  exports: [FilterOrphanThingsPipe]
})
export class PipesModule {}
