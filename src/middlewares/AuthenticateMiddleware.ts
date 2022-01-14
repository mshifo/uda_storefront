import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../helpers/config'

const AuthenticateMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization
    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1]
      if (jwt.verify(token, config.token_secret as string)) {
        next()
      }
    } else {
      res.status(401).json({ error: 'Access denied, token required' })
    }
  } catch {
    res.status(401).json({ error: 'Access denied, invalid token' })
  }
}

export default AuthenticateMiddleware
