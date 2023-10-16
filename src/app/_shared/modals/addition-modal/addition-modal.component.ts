import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { SnackBarService } from '../../services/snackbar.service'
import { IAppState } from '../../store/state/app.state'
import { AddContainer, EditContainer } from '../../store/actions/containers.actions'
import { AddThing, EditThing } from '../../store/actions/things.actions'
import { Store } from '@ngrx/store'
import { NgForm } from '@angular/forms'
import { ThingDTO } from '../../../things/things.service'
import { ContainerDTO } from '../../../containers/containers.service'
import { IThing } from '../../entities/thing'
import { IContainer } from '../../entities/container'

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
  @Input() data?: IThing | IContainer
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
    const thing: ThingDTO = {
      name: this.model.name,
      volume: this.model.volume
    }

    if (this.modalType === 'container') {
      const container: ContainerDTO = Object.assign(
        {
          volumeUsed: 0,
          children: []
        },
        thing
      )

      if (this.data) {
        container.id = this.data.id
        this.store.dispatch(new EditContainer(container as IContainer))
        this.cancel()
      } else {
        this.store.dispatch(new AddContainer(container))
      }
    } else {
      if (this.data) {
        thing.id = this.data.id
        this.store.dispatch(new EditThing(thing as IThing))
        this.cancel()
      } else {
        this.store.dispatch(new AddThing(thing))
      }
    }
  }
}
