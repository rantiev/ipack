import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { Container, Thing } from '../../services/data.service'
import { nanoid } from 'nanoid'
import { SnackBarService } from '../../services/snackbar.services'
import { IAppState } from '../../store/state/app.state'
import { AddContainer, EditContainer } from '../../store/actions/containers.actions'
import { AddThing, EditThing } from '../../store/actions/things.actions'
import { Store } from '@ngrx/store'
import { NgForm } from '@angular/forms'

export class EntityAdditionFormModel {
  constructor(
    public name: string,
    public volume: number
  ) {}
}

@Component({
  selector: 'app-addition-modal',
  templateUrl: './addition-modal.component.html',
  styleUrls: ['./addition-modal.component.scss']
})
export class AdditionModalComponent implements OnInit {
  @Input() modalType: 'container' | 'thing'
  @Input() data?: Thing | Container
  @ViewChild('form') public form: NgForm

  model: EntityAdditionFormModel

  constructor(
    private modalCtrl: ModalController,
    private snackService: SnackBarService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
    this.model = new EntityAdditionFormModel(this.data?.name || '', this.data?.volume || 0)
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel')
  }

  confirm() {
    return this.modalCtrl.dismiss(this.modalType, 'confirm')
  }

  onSubmit(form: NgForm) {
    const thing: Thing = {
      id: this.data?.id || nanoid(),
      name: this.model.name,
      volume: this.model.volume
    }

    if (this.modalType === 'container') {
      const container: Container = Object.assign(
        {
          volumeUsed: 0,
          things: []
        },
        thing
      )

      if (this.data) {
        this.store.dispatch(new EditContainer(container))
        this.snackService.openSnackBar(`${this.model.name} was edited`, '')
        this.cancel()
      } else {
        this.store.dispatch(new AddContainer(container))
        this.snackService.openSnackBar(`${this.model.name} was added`, '')
      }
    } else {
      if (this.data) {
        this.store.dispatch(new EditThing(thing))
        this.snackService.openSnackBar(`${this.model.name} was edited`, '')
        this.cancel()
      } else {
        this.store.dispatch(new AddThing(thing))
        this.snackService.openSnackBar(`${this.model.name} was added`, '')
      }
    }
  }
}
