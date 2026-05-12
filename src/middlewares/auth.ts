import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ResponseError } from '.'
import { TokenPayload } from '../@types/auth.type'


export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    throw new ResponseError('Token missing', 401)
  }

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

export function adminMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.user.userRole !== 'ADMIN') {
    throw new ResponseError('Unauthorized', 403)
  }

  next()
}