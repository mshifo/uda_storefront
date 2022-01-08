import { Router, Request, Response } from 'express';

const userRoutes = Router()

userRoutes.get('/', (req: Request, res: Response) => {
  res.send(`hello users`)
})

export default userRoutes
