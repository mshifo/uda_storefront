import { Router } from 'express'
import userRoutes from './users/usersApi'

const routes = Router()
routes.use('/users', userRoutes)

export default routes
