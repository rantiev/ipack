import { nanoid } from 'nanoid'

export const API_URL = '/api/v1'
export const API_URL_THINGS = `${API_URL}/things`
export const API_URL_CONTAINERS = `${API_URL}/containers`

export const DEMO_BOOKS = [
  {
    id: nanoid(),
    name: 'Demo Book',
    volume: 600
  },
  {
    id: nanoid(),
    name: 'Demo TV',
    volume: 32_000
  }
]

export const DEMO_CONTAINERS = [
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
]

export const SNACKBARS_TIMEOUT = 2000
