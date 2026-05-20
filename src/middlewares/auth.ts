import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ResponseError } from '.'
import { TokenPayload } from '../@types/auth.type'
import { prisma } from '../infra/lib/prisma'


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

export async function adminMiddleware(req: Request, res: Response, next: NextFunction) {

   const userId = req.user.userId

   const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
   })

   if (!user) {
    throw new ResponseError('User not found', 404)
  }

   if (user.role !== 'ADMIN') {
     throw new ResponseError('Unauthorized', 403)
   }

   if (user.status !== 'ACTIVE') {
     throw new ResponseError('User inactive', 403)
   }

  next()
}