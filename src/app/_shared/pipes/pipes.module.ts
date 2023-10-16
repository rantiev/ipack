import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FilterOrphanThingsPipe } from './filter-orphan-things.pipe'
import { FilterOrphanContainersPipe } from './filter-orphan-containers.pipe'
import { FilterThingsPipe } from './filter-things.pipe'
import { FilterContainersPipe } from './filter-containers.pipe'

@NgModule({
  declarations: [
    FilterOrphanThingsPipe,
    FilterOrphanContainersPipe,
    FilterThingsPipe,
    FilterContainersPipe
  ],
  imports: [CommonModule],
  exports: [
    FilterOrphanThingsPipe,
    FilterOrphanContainersPipe,
    FilterThingsPipe,
    FilterContainersPipe
  ]
})
export class PipesModule {}
