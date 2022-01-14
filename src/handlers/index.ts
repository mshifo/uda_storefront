import { Router } from 'express'
import productsApi from './products'
import userRoutes from './users'

const routes = Router()
routes.use('/products', productsApi)
routes.use('/users', userRoutes)

export default routes
