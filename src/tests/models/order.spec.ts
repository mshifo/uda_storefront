import { Order, OrderWithDetails } from '../../interfaces/Order'
import Product from '../../interfaces/Product'
import { User } from '../../interfaces/User'
import OrderModel from '../../models/Order.model'
import ProductModel from '../../models/Product.model'
import UserModel from '../../models/User.model'

let order: Order
const orderToAdd: OrderWithDetails = {
  product_id: 0,
  quantity: 3,
  user_id: 0
}

describe('Testing Order Model', () => {
  beforeAll(async () => {
    const userToAdd: User = {
      firstName: 'John',
      lastName: 'Doe',
      password: 'Password',
      userName: (Math.random() + 1).toString(36).substring(7)
    }
    const user = await UserModel.add(userToAdd)
    if (user.id) {
      orderToAdd.user_id = user.id
    }

    const productToAdd: Product = {
      name: 'Apple',
      price: 1.5
    }
    const product = await ProductModel.add(productToAdd)
    if (product.id) {
      orderToAdd.product_id = product.id
    }
  })

  it('Test add method', async () => {
    expect(OrderModel.add).toBeDefined()
    order = await OrderModel.add(orderToAdd)
    expect({
      user_id: order.user_id
    }).toEqual({
      user_id: order.user_id
    })
  })
  it('Test all method', async () => {
    expect(OrderModel.all).toBeDefined()
    const result = await OrderModel.all()
    expect(result).toContain(order)
  })

  it('Test find method', async () => {
    expect(OrderModel.find).toBeDefined()
    const result = await OrderModel.find(order.user_id)
    const detailedOrder = order as OrderWithDetails
    detailedOrder.product_id = orderToAdd.product_id
    detailedOrder.quantity = orderToAdd.quantity
    detailedOrder.order_id = order.id as number
    expect(result).toContain(detailedOrder)
  })

  it('Test find method | null', async () => {
    const result = await OrderModel.find(99999)
    expect(result).toEqual([])
  })
})
