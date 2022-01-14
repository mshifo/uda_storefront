import { Router, Request, Response } from 'express'
import AuthenticateMiddleware from '../middlewares/AuthenticateMiddleware'
import OrderCreateSchema from '../middlewares/schemas/OrdersSchema'
import ValidateMiddleware from '../middlewares/ValidateMiddleware'
import OrderModel from '../models/Order.model'

const orderRoutes = Router()

orderRoutes.post(
  '/',
  [AuthenticateMiddleware, ValidateMiddleware(OrderCreateSchema)],
  async (req: Request, res: Response) => {
    try {
      await OrderModel.add(req.body)
      res.send({ order: 'Order Created Successfully!' })
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong!' })
    }
  }
)

orderRoutes.get('/:user_id', AuthenticateMiddleware, async (req: Request, res: Response) => {
  try {
    const orders = await OrderModel.find(req.params.user_id as unknown as number)
    res.send(orders)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong!' })
  }
})

export default orderRoutes
