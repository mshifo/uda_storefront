import client from '../database'
import { hashPassword, comparePasswords } from '../helpers/hashPassword'
import { User } from '../interfaces/User'

class UserModel {
  static async all(): Promise<User[]> {
    try {
      const connection = await client.connect()
      const { rows } = await client.query('SELECT id,userName,firstName,lastName FROM users')
      connection.release()
      return rows
    } catch (error) {
      throw new Error(`Failed to fetch data error: ${error}`)
    }
  }

  static async find(id: string): Promise<User> {
    try {
      const connection = await client.connect()
      const { rows } = await client.query(
        'SELECT id,userName,firstName,lastName FROM users WHERE id = $1',
        [id]
      )
      connection.release()
      return rows[0]
    } catch (error) {
      throw new Error(`Failed to fetch data error: ${error}`)
    }
  }

  static async authenticate(userName: string, password: string): Promise<User | null> {
    try {
      const connection = await client.connect()
      const { rows } = await client.query('SELECT password FROM users WHERE userName = $1', [
        userName
      ])
      connection.release()
      if (rows.length) {
        const user = rows[0]
        if (comparePasswords(password, user.password)) {
          return user
        }
      }

      return null
    } catch (error) {
      throw new Error(`Failed to fetch data error: ${error}`)
    }
  }

  static async findByUserName(userName: string): Promise<User | null> {
    try {
      const connection = await client.connect()
      const { rows } = await client.query('SELECT * FROM users WHERE userName = $1', [userName])
      connection.release()
      if (rows.length) {
        const user = rows[0]
        return user
      }

      return null
    } catch (error) {
      throw new Error(`Failed to fetch data error: ${error}`)
    }
  }

  /**
   * add
   */
  static add = async (user: User): Promise<User> => {
    const sql =
      'INSERT INTO users (userName,firstName,lastName,password) VALUES($1,$2,$3,$4) RETURNING *'
    const parameters = [user.userName, user.firstName, user.lastName, hashPassword(user.password)]
    try {
      const connection = await client.connect()
      const { rows } = await client.query(sql, parameters)
      connection.release()
      return rows[0]
    } catch (error) {
      throw new Error(`Failed to fetch data error: ${error}`)
    }
  }
}

export default UserModel
