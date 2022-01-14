import bcrypt from 'bcrypt'
import config from './config'

const hashPassword = (password: string): string => {
  const hash = bcrypt.hashSync(password + config.pepper, parseInt(config.salt as string, 10))
  return hash
}

const comparePasswords = (password1: string, password2: string): boolean =>
  bcrypt.compareSync(password1 + config.pepper, password2)

export { hashPassword, comparePasswords }
