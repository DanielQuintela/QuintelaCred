
import { z } from 'zod'

export const simulationSchema = z.object({
  amount: z.number().positive(),

  installmentsNumber: z.number().min(1).max(12),

  cardFlag: z.enum(['MASTER', 'VISA', 'ELO', 'AMEX', 'DINERS', 'HIPERCARD', 'OUTROS']),

  type: z.enum(['LIBERADO', 'LIMITE']),

  bankName: z.string().optional()
})
