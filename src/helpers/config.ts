import * as dotenv from 'dotenv'

const envFound = dotenv.config()
if (envFound.error) {
  // This error should crash whole process
  throw new Error("Couldn't find .env file")
}

export default {
  port: process.env.PORT,
  db_host: process.env.DB_HOST,
  db_name: process.env.DB_DATABASE,
  db_test_name: process.env.DB_TEST_DATABASE,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  salt: process.env.SALT_ROUNDS,
  pepper: process.env.BCRYPT_PASSWORD,
  token_secret: process.env.TOKEN_SECRET,
  environment: process.env.NODE_ENV
}
