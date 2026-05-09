
import { CreateTaxData, GetTaxData, UpdateTaxData } from '../../@types/tax.type'
import { ResponseError } from '../../middlewares'
import { TaxRepository } from './tax.repository'

const repository = new TaxRepository()

export class TaxService {
  async create(data: CreateTaxData) {
    
    const taxExists = await repository.findExisting(data)

    if (taxExists) {
      throw new ResponseError(
        'Tax already exists for this configuration', 409
      )
    }

    return repository.create(data)
  }

  async findMany() {
    return repository.findMany()
  }

  async findExisting(data: GetTaxData) {
    return repository.findExisting(data)
  }

  async update(data: UpdateTaxData) {
    return repository.updateTaxData(data)
  }

  async delete(id: string) {
    return repository.deleteTaxData(id)
  }
}