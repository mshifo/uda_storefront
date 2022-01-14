import { Pool } from 'pg'
import config from './helpers/config'

const client = new Pool({
  host: config.db_host,
  user: config.db_user,
  password: config.db_password,
  database: config.db_name
})

export default client
