import { Elysia } from 'elysia'
import { notificationRoutes } from './notificationRoutes'
import { cronJobRoutes } from './cronJobRoutes'
import { seedRoutes } from './seedRoutes'

export const routes = new Elysia()
  .use(notificationRoutes)
  .use(cronJobRoutes)
  .use(seedRoutes)