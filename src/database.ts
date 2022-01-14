import { Pool } from 'pg'
import config from './helpers/config'

const client = new Pool({
  host: config.db_host,
  user: config.db_user,
  password: config.db_password,
  database: config.environment === 'dev' ? config.db_name : config.db_test_name
})

export default client
