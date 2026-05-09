import { Request, Response } from 'express'
import { TaxService } from './tax.service'

const service = new TaxService()

export class TaxController {
  async create(req: Request, res: Response) {
    const tax = await service.create(req.body)

    return res.status(201).json(tax)
  }

  async findMany(req: Request, res: Response) {
    const taxes = await service.findMany()

    return res.json(taxes)
  }
  
  async findExisting(req: Request, res: Response) {
    const tax = await service.findExisting(req.body)

    return res.json(tax)
  }
  
  async update(req: Request, res: Response) {
    const tax = await service.update(req.body)

    return res.json(tax)
  }
  
  async delete(req: Request, res: Response) {
    const { id } = req.body
    const tax = await service.delete(id)

    return res.json(tax)
  }
}