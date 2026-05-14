
export interface CreateTaxData {
  installments_number: number
  value: number
  card_flag: 'MASTER' | 'VISA' | 'ELO' | 'AMEX' | 'DINERS' | 'HIPERCARD' | 'OUTROS'
  type: 'LIBERADO' | 'LIMITE'
  description?: string
  bank_name?: string
}

export interface GetTaxData {
  installments_number: number
  value?: number
  card_flag: 'MASTER' | 'VISA' | 'ELO' | 'AMEX' | 'DINERS' | 'HIPERCARD' | 'OUTROS'
  type: 'LIBERADO' | 'LIMITE'
  description?: string
  bank_name?: string
}

export interface UpdateTaxData {
  id: string
  installments_number: number
  value: number
  card_flag: 'MASTER' | 'VISA' | 'ELO' | 'AMEX' | 'DINERS' | 'HIPERCARD' | 'OUTROS'
  type: 'LIBERADO' | 'LIMITE'
  description?: string
  bank_name?: string
}