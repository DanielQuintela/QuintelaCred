import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { ZodSchema } from 'zod'

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Token missing' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    ;(req as any).user = decoded
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

export class ResponseError extends Error {
  statusCode: number

  constructor(message: string, statusCode = 400) {
    super(message)
    this.statusCode = statusCode
  }
}


export function validateDto(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      return res.status(400).json({
        error: result.error.format()
      })
    }

    req.body = result.data
    next()
  }
}
