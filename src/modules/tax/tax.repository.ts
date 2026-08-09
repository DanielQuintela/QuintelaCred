
import { CreateTaxData, GetTaxData, UpdateTaxData } from '../../@types/tax.type'
import { prisma } from '../../infra/lib/prisma'

export class TaxRepository {
  async create(data: CreateTaxData) {
    return prisma.tax.create({
      data: {
        installments_number: data.installmentsNumber,
        value: data.value,
        card_flag: data.cardFlag,
        type: data.type,
        description: data.description,
        bank_name: data.bankName,
        location_id: data.locationId
      }
    })
  }

 async findMany() {
  return prisma.tax.findMany({
    orderBy: {
      installments_number: 'asc',
    },
    include: {
      location: {
        select: {
          id: true,
          name: true,
          city: true,
          state: true,
        },
      },
    },
  })
}

  async findById(id: string) {
    return prisma.tax.findUnique({
      where: { id },
      include: {
        location: {
          select: {
            id: true,
            name: true,
            city: true,
            state: true,
          },
        },
      },
    })
  }

  async findExisting(data: GetTaxData) {
    return prisma.tax.findFirst({
      where: {
        installments_number: data.installmentsNumber,
        value: data.value,
        card_flag: data.cardFlag,
        type: data.type,
        bank_name: data.bankName,
        location_id: data.locationId
      }
    })
  }

 async update(id: string, data: UpdateTaxData) {
  return prisma.tax.update({
    where: { id },
      data: {
        installments_number: data.installmentsNumber,
        value: data.value,
        card_flag: data.cardFlag,
        type: data.type,
        bank_name: data.bankName,
        description: data.description,
        location_id: data.locationId
      },
    })
  }

  async delete(id: string) {
    return prisma.tax.delete({
      where: { id }
    })
  }
}