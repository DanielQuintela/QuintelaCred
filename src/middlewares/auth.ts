import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ResponseError } from '.'


interface TokenPayload {
  userId: string
  userEmail: string
  userName: string
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new ResponseError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as TokenPayload

    req.user = decoded

    next()
  } catch {
    throw new ResponseError('Invalid token', 401)
  }
}