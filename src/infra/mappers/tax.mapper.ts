import { Tax } from "@prisma/client";

export function taxMapper(tax: Tax) {
  return {
    id: tax.id,
    installmentsNumber: tax.installments_number,
    value: Number(tax.value),
    cardFlag: tax.card_flag,
    type: tax.type,
    bankName: tax.bank_name,
    description: tax.description,
    createdAt: tax.create_at,
    updatedAt: tax.update_at,
  }
}