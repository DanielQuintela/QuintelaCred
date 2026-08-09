
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
        'Já existe uma taxa cadastrada para esta configuração', 409
      )
    }

    console.log('Creating tax with data:', data);

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
      throw new ResponseError('Taxa não encontrada', 404)
    }

    return tax
  }

  async findExisting(data: GetTaxData) {
    return taxRepository.findExisting(data)
  }

  async update(id: string, data: UpdateTaxData, req: any) {
    const taxExists = await taxRepository.findById(id)

    if (!taxExists) {
      throw new ResponseError('Taxa não encontrada', 404)
    }

    console.log('Atualizando taxa com dados:', data);
    
     const taxSameExists = await taxRepository.findExisting(data)
    
    if (taxSameExists) {
      throw new ResponseError(
        'Já existe uma taxa cadastrada para esta configuração', 409
      )
    }

    const tax = await taxRepository.update(id, data)
    
    createAuditLog({
      table_name: 'tax',
      record_id: taxExists.id,
      action: 'UPDATE',
      user_id: req.user.userId,
      old_values: taxExists,
      new_values: data
    })

    return tax
  }

  async delete(id: string, req: any) {
    const taxExists = await taxRepository.findById(id)

    console.log('Deleting tax with id:', id);

    if (!taxExists) {
      throw new ResponseError('Taxa não encontrada', 404)
    }

    await taxRepository.delete(id)

    createAuditLog({
      table_name: 'tax',
      record_id: taxExists.id,
      action: 'DELETE',
      user_id: req.user.userId,
      old_values: taxExists,
      new_values: null
    })
  }
}