import { z } from 'zod'

export const createTaxSchema = z.object({
  installmentsNumber: z.number().min(1),
  value: z.number().positive(),

  cardFlag: z.enum(['MASTER', 'VISA', 'ELO', 'AMEX', 'DINERS', 'HIPERCARD', 'OUTROS']),
  type: z.enum(['LIBERADO', 'LIMITE']),

  description: z.string().optional(),

  bankName: z.string().optional()
})

export const updateTaxSchema = z.object({
  id: z.string(),
  installmentsNumber: z.number().min(1).optional(),
  value: z.number().positive().optional(),

  cardFlag: z.enum(['MASTER', 'VISA', 'ELO', 'AMEX', 'DINERS', 'HIPERCARD', 'OUTROS']).optional(),
  type: z.enum(['LIBERADO', 'LIMITE']).optional(),

  description: z.string().optional(),

  bankName: z.string().optional()
})


