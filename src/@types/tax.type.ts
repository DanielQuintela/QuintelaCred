
export interface CreateTaxData {
  installmentsNumber: number
  value: number
  cardFlag: 'MASTER' | 'VISA' | 'ELO' | 'AMEX' | 'DINERS' | 'HIPERCARD' | 'OUTROS'
  type: 'LIBERADO' | 'LIMITE'
  description?: string
  bankName?: string
  locationId: string
}

export interface GetTaxData {
  installmentsNumber: number
  value?: number
  cardFlag: 'MASTER' | 'VISA' | 'ELO' | 'AMEX' | 'DINERS' | 'HIPERCARD' | 'OUTROS'
  type: 'LIBERADO' | 'LIMITE'
  description?: string
  bankName?: string
  locationId: string
}

export interface UpdateTaxData {
  id: string
  installmentsNumber: number
  value: number
  cardFlag: 'MASTER' | 'VISA' | 'ELO' | 'AMEX' | 'DINERS' | 'HIPERCARD' | 'OUTROS'
  type: 'LIBERADO' | 'LIMITE'
  description?: string
  bankName?: string
  locationId: string
}