import client from '../database'
import { Order, OrderWithDetails } from '../interfaces/Order'

class ProductModel {
  static async all(): Promise<Order[]> {
    try {
      const connection = await client.connect()
      const { rows } = await client.query('SELECT * FROM products')
      connection.release()
      return rows
    } catch (error) {
      throw new Error(`Failed to fetch data error: ${error}`)
    }
  }

  static async find(userId: number): Promise<OrderWithDetails[]> {
    try {
      const connection = await client.connect()
      const { rows } = await client.query(
        'SELECT * FROM orders inner join order_items on orders.id = order_items.order_id WHERE user_id = $1',
        [userId]
      )
      connection.release()
      return rows
    } catch (error) {
      throw new Error(`Failed to fetch data ${error}`)
    }
  }

  static add = async (order: OrderWithDetails): Promise<Order> => {
    let sql = 'INSERT INTO orders (user_id,status) VALUES($1,$2) RETURNING *'
    let parameters = [order.user_id, 'active']
    try {
      const connection = await client.connect()
      const result = await client.query(sql, parameters)

      const orderId = result.rows[0].id
      sql = 'INSERT INTO order_items (product_id,quantity,order_id) VALUES($1,$2,$3) RETURNING *'
      parameters = [order.product_id, order.quantity, orderId]
      await client.query(sql, parameters)
      connection.release()

      return result.rows[0]
    } catch (error) {
      throw new Error(`Failed to fetch data ${error}`)
    }
  }
}

export default ProductModel
