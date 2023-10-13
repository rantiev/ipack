import { Injectable } from '@angular/core'
import { nanoid } from 'nanoid'
import { BehaviorSubject } from 'rxjs'

export interface Base {
  id: string
  name: string
  volume: number
}

export interface Thing extends Base {
  containerId?: string
}

export interface Container extends Base {
  things: Thing[]
  volumeUsed: number
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public containers: BehaviorSubject<Container[]> = new BehaviorSubject([
    {
      id: nanoid(),
      name: 'Box',
      volume: 1_000,
      volumeUsed: 0,
      things: []
    },
    {
      id: nanoid(),
      name: 'Container',
      volume: 40_000_000,
      volumeUsed: 0,
      things: []
    }
  ] as Container[])
  public things: BehaviorSubject<Thing[]> = new BehaviorSubject([
    {
      id: nanoid(),
      name: 'Book',
      volume: 600
    },
    {
      id: nanoid(),
      name: 'TV',
      volume: 32_000
    }
  ])

  constructor() {}

  public getContainers(): BehaviorSubject<Container[]> {
    return this.containers
  }

  public addContainer(container: Container): Container {
    this.containers.next([...this.containers.getValue(), container])

    return container
  }

  /*public removeContainer(id: string): Container | undefined {
    const removedIndex = this.containers.findIndex(el => el.id === id)

    if (removedIndex < 0) {
      return
    }

    const removedElement = this.containers[removedIndex]
    this.containers = [...this.containers.splice(removedIndex, 1)]

    return removedElement
  }*/

  public getThings(): BehaviorSubject<Thing[]> {
    return this.things
  }

  /*public getThing(id: string): Thing | undefined {
    return this.state.things.find(el => el.id === id)
  }*/

  public addThing(thing: Thing): Thing {
    this.things.next([...this.things.getValue(), thing])

    return thing
  }

  /*public removeThing(id: string): Thing | undefined {
    const removedIndex = this.state.things.findIndex(el => el.id === id)

    if (removedIndex < 0) {
      return
    }

    const removedElement = this.state.things[removedIndex]
    this.things = [...this.state.things.splice(removedIndex, 1)]

    return removedElement
  }*/

  public updateContainer(container: Container) {
    const containers = this.containers.getValue()

    let existingContainerIndex = containers.findIndex((el: Container) => el.id === container.id)
    containers.splice(existingContainerIndex, 1, container)

    this.containers.next([...containers])
  }

  public updateThing(thing: Thing) {
    const things = this.things.getValue()

    let existingThingIndex = things.findIndex((el: Thing) => el.id === thing.id)
    things.splice(existingThingIndex, 1, thing)

    this.things.next([...things])
  }
}
