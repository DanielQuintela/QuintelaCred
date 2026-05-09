
export interface SimulateData {
  amount: number
  installmentsNumber: number

  cardFlag: 'MASTER' | 'VISA' | 'ELO' | 'AMEX' | 'DINERS' | 'HIPERCARD' | 'OUTROS'

  type: 'LIBERADO' | 'LIMITE'

  bankName: string
}

export interface SimulationResult {
  amount: number

  taxPercentage: number

  taxValue: number

  netAmount: number

  installmentValue: number
}