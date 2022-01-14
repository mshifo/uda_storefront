import client from '../database'
import Product from '../interfaces/Product'

class ProductModel {
  static async all(): Promise<Product[]> {
    try {
      const connection = await client.connect()
      const { rows } = await client.query('SELECT * FROM products')
      connection.release()
      return rows
    } catch (error) {
      throw new Error(`Failed to fetch data error: ${error}`)
    }
  }

  static async find(id: number): Promise<Product | null> {
    try {
      const connection = await client.connect()
      const { rows } = await client.query('SELECT * FROM products WHERE id = $1', [id])
      connection.release()
      if (rows.length) {
        return rows[0]
      }
      return null
    } catch (error) {
      throw new Error(`Failed to fetch data ${error}`)
    }
  }

  static add = async (product: Product): Promise<Product> => {
    const sql = 'INSERT INTO products (name,price) VALUES($1,$2) RETURNING *'
    const parameters = [product.name, product.price]
    try {
      const connection = await client.connect()
      const { rows } = await client.query(sql, parameters)
      connection.release()
      return rows[0]
    } catch (error) {
      throw new Error(`Failed to fetch data ${error}`)
    }
  }
}

export default ProductModel
