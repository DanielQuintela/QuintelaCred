
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
        installmentsNumber: 'asc'
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
        installmentsNumber: data.installmentsNumber,
        cardFlag: data.cardFlag,
        type: data.type,
        bankName: data.bankName
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