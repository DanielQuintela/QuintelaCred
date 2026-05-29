import { Request, Response } from 'express'
import { AuthService } from './auth.service'

const authService = new AuthService()

export class AuthController {
  async register(req: Request, res: Response) {
      const user = await authService.register(req.body)

      return res.status(201).send({data:user, message:'Usuario cadastrado com sucesso', success:true})
  }

  async login(req: Request, res: Response) {
      const result = await authService.login(req.body)

      return res.status(200).send({data:result, message:'Login successful', success:true})
  }

  async findMe(req: Request, res: Response) {
    const user = await authService.FindMe(req.user.userId)
    return res.status(200).send({data:user, message:'User found', success:true})
  }

}