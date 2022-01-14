import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env

const client = new Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE
})

export default client
