import { rest } from 'msw'
import {
  API_URL,
  API_URL_CONTAINERS,
  API_URL_THINGS,
  DEMO_BOOKS,
  DEMO_CONTAINERS
} from '../app/_shared/constants/global'
import { nanoid } from 'nanoid'

export const handlers = [
  rest.get(`${API_URL_THINGS}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        items: DEMO_BOOKS
      })
    )
  }),
  rest.post(`${API_URL_THINGS}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(Object.assign({ id: nanoid() }, req.body)))
  }),
  rest.put(`${API_URL_THINGS}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(req.body))
  }),
  rest.delete(`${API_URL_THINGS}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(req.body))
  }),
  rest.get(`${API_URL_CONTAINERS}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        items: DEMO_CONTAINERS
      })
    )
  }),
  rest.post(`${API_URL_CONTAINERS}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(Object.assign({ id: nanoid() }, req.body)))
  }),
  rest.put(`${API_URL_CONTAINERS}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(req.body))
  }),
  rest.delete(`${API_URL_CONTAINERS}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(req.body))
  })
]
