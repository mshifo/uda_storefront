import { Router } from 'express'
import productsApi from './products'
import userRoutes from './users'
import orderRoutes from './orders'

const routes = Router()
routes.use('/products', productsApi)
routes.use('/users', userRoutes)
routes.use('/orders', orderRoutes)

export default routes
