import { Request, Response } from 'express'

import { TaxService } from './tax.service'

import {CreateTaxData, GetTaxData, UpdateTaxData} from '../../@types/tax.type'
import { taxMapper } from '../../infra/mappers/tax.mapper'

const service = new TaxService()

export class TaxController {
  create = async (req: Request, res: Response) => {
    const body: CreateTaxData = req.body

    console.log('Creating tax with data:', body)
    const tax = await service.create(body, req)

    return res.status(201).json(tax)
  }

  findMany = async (_req: Request, res: Response) => {
    const taxes = await service.findMany()

   return res.json (
    taxes.map(taxMapper)
  )
  }

  findById = async (req: Request, res: Response) => {
    const id = req.params.id as string

    const tax = await service.findById(id)

    return res.json(taxMapper(tax))
  }

  findExisting = async (req: Request, res: Response) => {
    const query = req.query as unknown as GetTaxData

    const tax = await service.findExisting(query)

    return res.json(tax)
  }

  update = async (req: Request, res: Response) => {    
    const id = req.params.id as string
    const body: UpdateTaxData = req.body

    const tax = await service.update(id, body, req)

    return res.json(tax)
  }

  delete = async (req: Request, res: Response) => {
    const id = req.params.id as string

    await service.delete(id, req)

    return res.status(204).send()
  }
}