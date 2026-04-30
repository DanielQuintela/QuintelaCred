import { Request, Response, NextFunction } from 'express'
import { ResponseError } from './index'

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ResponseError) {
    return res.status(err.statusCode).json({
      error: err.message
    })
  }

  console.error(err)

  return res.status(500).json({
    error: 'Internal server error'
  })
}

// Esse middleware é responsável por capturar erros e retornar a resposta
// sem precisar voltar para controller