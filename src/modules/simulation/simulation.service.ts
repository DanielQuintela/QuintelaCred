import { ResponseError } from '../../middlewares'

import { TaxRepository } from '../tax/tax.repository'

import { SimulateData, SimulationResult } from '../../@types/simulation.type'
import { arredondarParaDuasCasas } from '../../services/functions/formatacao'

const repository = new TaxRepository()

export class SimulationService {
  async simulate(data: SimulateData): Promise<SimulationResult> {
    const tax = await repository.findExisting({
      installments_number: data.installmentsNumber,
      card_flag: data.cardFlag,
      type: data.type,
      bank_name: data.bankName
    })

    if (!tax) {
      throw new ResponseError('Tax not found', 404)
    }

    let valorParcelas: number
    let valorRecebido: number
    let passaNoCartao: number

    const taxPercentage = Number(tax.value)
    const taxRate = taxPercentage / 100
    const taxRateFormatted = Number((taxPercentage / 100).toFixed(4))

    let valorCalculo = data.amount
    let taxaCalculada = arredondarParaDuasCasas(
      valorCalculo * taxRate
    )

    if (tax.type === 'LIBERADO') {
      // Usuário informa quanto quer receber

      valorRecebido = valorCalculo
      
      const paidAmount = taxaCalculada + valorCalculo

      valorParcelas = arredondarParaDuasCasas(
        paidAmount / data.installmentsNumber
      )

      passaNoCartao = paidAmount


    } else {
      // Usuário informa quanto vai passar no cartão
      
      valorRecebido = valorCalculo - taxaCalculada

      valorParcelas = arredondarParaDuasCasas(
        valorCalculo / data.installmentsNumber
      )

      passaNoCartao = valorCalculo
    }

    return {
      amount: data.amount,
      installmentNumber: data.installmentsNumber,
      installmentAmount: valorParcelas,
      taxPercentage,
      tax: taxRateFormatted,
      taxaCalculada,
      passaNoCartao,
      receivedAmount: valorRecebido
    }
  }
}