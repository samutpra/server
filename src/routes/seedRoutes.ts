import { Elysia } from 'elysia'
import { seedController } from '../controllers/seedController'

export const seedRoutes = new Elysia({ prefix: '/api' })
  .use(seedController)