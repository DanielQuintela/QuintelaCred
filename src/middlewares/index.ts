import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'

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
