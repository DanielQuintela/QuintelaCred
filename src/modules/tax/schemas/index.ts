import { z } from 'zod'

export const createTaxSchema = z.object({
  installmentsNumber: z.number().min(1, 'Número de parcelas deve ser no mínimo 1'),
  value: z.number().positive('O valor deve ser um número positivo').max(100000.00, 'A taxa não pode ser maior que 1.000.000,00'),

  cardFlag: z.enum(['MASTER', 'VISA', 'ELO', 'AMEX', 'DINERS', 'HIPERCARD', 'OUTROS', 'VISAMASTER', 'ELODEMAISBANDEIRAS']),
  type: z.enum(['LIBERADO', 'LIMITE']),

  description: z.string().optional(),

  bankName: z.string().optional(),
  locationId: z.string().uuid()
})

export const updateTaxSchema = z.object({
  installmentsNumber: z.number().min(1, 'Número de parcelas deve ser no mínimo 1').optional(),
  value: z.number().positive('O valor deve ser um número positivo').max(100000.00, 'A taxa não pode ser maior que 1.000.000,00').optional(),

  cardFlag: z.enum(['MASTER', 'VISA', 'ELO', 'AMEX', 'DINERS', 'HIPERCARD', 'OUTROS', 'VISAMASTER', 'ELODEMAISBANDEIRAS']).optional(),
  type: z.enum(['LIBERADO', 'LIMITE']).optional(),

  description: z.string().optional(),

  bankName: z.string().optional(),
  locationId: z.string().uuid()
})


