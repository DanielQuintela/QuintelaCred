import { Prisma } from '@prisma/client'

// Tipagem exata mapeando o select específico feito no repositório
export type TaxWithLocation = Prisma.TaxGetPayload<{
  include: {
    location: {
      select: {
        id: true
        name: true
        city: true
        state: true
      }
    }
  }
}>

export function taxMapper(tax: TaxWithLocation) {
  return {
    id: tax.id,
    installmentsNumber: tax.installments_number,
    value: Number(tax.value),
    cardFlag: tax.card_flag,
    type: tax.type,
    bankName: tax.bank_name,
    description: tax.description,
    location: tax.location
      ? {
          id: tax.location.id,
          name: tax.location.name,
          city: tax.location.city,
          state: tax.location.state,
        }
      : null,
    createdAt: tax.created_at,
    updatedAt: tax.updated_at,
  }
}