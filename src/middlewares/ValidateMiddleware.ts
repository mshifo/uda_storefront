import { Schema } from 'joi'
import { Request, Response, NextFunction } from 'express'

const ValidateMiddleware =
  (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    schema
      .validateAsync(req.body)
      .then(() => {
        next()
      })
      .catch((error) => {
        res.status(422).json({ error: error.details[0].message })
      })
  }

export default ValidateMiddleware
