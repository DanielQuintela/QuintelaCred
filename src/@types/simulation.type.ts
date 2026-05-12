
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
  tax: number
  taxaCalculada: number
  installmentAmount: number
  installmentNumber: number
  receivedAmount: number
  passaNoCartao: number
}