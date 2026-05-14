
import { CreateTaxData, GetTaxData, UpdateTaxData } from '../../@types/tax.type'
import { prisma } from '../../infra/lib/prisma'

export class TaxRepository {
  async create(data: CreateTaxData) {
    return prisma.tax.create({
      data
    })
  }

  async findMany() {
    return prisma.tax.findMany({
      orderBy: {
        installments_number
        : 'asc'
      }
    })
  }

  async findById(id: string) {
    return prisma.tax.findUnique({
      where: { id }
    })
  }

  async findExisting(data: GetTaxData) {
    return prisma.tax.findFirst({
      where: {
        installments_number: data.installments_number,
        card_flag: data.card_flag,
        type: data.type,
        bank_name: data.bank_name
      }
    })
  }

  async update(id: string, data: UpdateTaxData) {
    return prisma.tax.update({
      where: { id },
      data
    })
  }

  async delete(id: string) {
    return prisma.tax.delete({
      where: { id }
    })
  }
}