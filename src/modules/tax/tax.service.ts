
import { CreateTaxData, GetTaxData, UpdateTaxData } from '../../@types/tax.type'
import { ResponseError } from '../../middlewares'
import { TaxRepository } from './tax.repository'

const repository = new TaxRepository()

export class TaxService {
  async create(data: CreateTaxData) {
    const taxExists = await repository.findExisting(data)

    if (taxExists) {
      throw new ResponseError(
        'Já existe uma taxa cadastrada para esta configuração', 409
      )
    }

    return repository.create(data)
  }

  async findMany() {
    return repository.findMany()
  }

   async findById(id: string) {
    const tax = await repository.findById(id)

    if (!tax) {
      throw new ResponseError('Taxa não encontrada', 404)
    }

    return tax
  }

  async findExisting(data: GetTaxData) {
    return repository.findExisting(data)
  }

  async update(id: string, data: UpdateTaxData) {
    const taxExists = await repository.findById(id)

    if (!taxExists) {
      throw new ResponseError('Taxa não encontrada', 404)
    }

    return repository.update(id, data)
  }

  async delete(id: string) {
    const taxExists = await repository.findById(id)

    if (!taxExists) {
      throw new ResponseError('Taxa não encontrada', 404)
    }

    await repository.delete(id)
  }
}