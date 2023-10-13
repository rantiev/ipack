import { NgModule } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { AdditionModalComponent } from './addition-modal/addition-modal.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [AdditionModalComponent],
  declarations: [AdditionModalComponent]
})
export class ModalsModule {}
