
import { CreateTaxData, GetTaxData, UpdateTaxData } from '../../@types/tax.type'
import { createAuditLog } from '../../infra/shared/utils/audit'
import { ResponseError } from '../../middlewares'
import { TaxRepository } from './tax.repository'

const taxRepository = new TaxRepository()

export class TaxService {
  async create(data: CreateTaxData, req: any) {
    const taxExists = await taxRepository.findExisting(data)
    
    if (taxExists) {
      throw new ResponseError(
        'Tax already exists for this configuration', 409
      )
    }

    const tax = await taxRepository.create(data)

    createAuditLog({
      table_name: 'tax',
      record_id: tax.id,
      action: 'CREATE',
      user_id: req.user.userId,
      old_values: null,
      new_values: data
    })

    return tax
  }

  async findMany() {
    return taxRepository.findMany()
  }

   async findById(id: string) {
    const tax = await taxRepository.findById(id)

    if (!tax) {
      throw new ResponseError('Tax not found', 404)
    }

    return tax
  }

  async findExisting(data: GetTaxData) {
    return taxRepository.findExisting(data)
  }

  async update(id: string, data: UpdateTaxData) {
    const taxExists = await taxRepository.findById(id)

    if (!taxExists) {
      throw new ResponseError('Tax not found', 404)
    }

    return taxRepository.update(id, data)
  }

  async delete(id: string) {
    const taxExists = await taxRepository.findById(id)

    if (!taxExists) {
      throw new ResponseError('Tax not found', 404)
    }

    await taxRepository.delete(id)
  }
}