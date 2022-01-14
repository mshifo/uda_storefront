import { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../interfaces/User'
import UserModel from '../models/User.model'
import ValidateMiddleware from '../middlewares/ValidateMiddleware'
import { UserCreateSchema, UserLoginSchema } from '../middlewares/schemas/UsersSchema'
import config from '../helpers/config'
import AuthenticateMiddleware from '../middlewares/AuthenticateMiddleware'

const userRoutes = Router()

/**
 * login
 */
userRoutes.post(
  '/login',
  ValidateMiddleware(UserLoginSchema),
  async (req: Request, res: Response) => {
    try {
      const userToLogin: User = req.body
      const user = await UserModel.authenticate(userToLogin.userName, userToLogin.password)
      const token = jwt.sign({ user }, config.token_secret as string)
      res.json({ token })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Something went wrong!' })
    }
  }
)

/**
 * index
 */
userRoutes.get('/', AuthenticateMiddleware, async (req: Request, res: Response) => {
  try {
    const users = await UserModel.all()
    res.send(users)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!' })
  }
})

/**
 * show
 */
userRoutes.get('/:id', AuthenticateMiddleware, async (req: Request, res: Response) => {
  try {
    const user = await UserModel.find(req.params.id)
    res.status(user ? 200 : 404).send(user ?? { message: 'User Not found' }) // ternary operator
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!' })
  }
})

/**
 * create
 */
userRoutes.post('/', ValidateMiddleware(UserCreateSchema), async (req: Request, res: Response) => {
  try {
    const newUser = await UserModel.add(req.body)
    const token = jwt.sign({ user: newUser }, config.token_secret as string)
    res.json({ token })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong!' })
  }
})

export default userRoutes
