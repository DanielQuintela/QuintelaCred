import { ResponseError } from '../../middlewares'

import { TaxRepository } from '../tax/tax.repository'

import { SimulateData, SimulationResult } from '../../@types/simulation.type'
import { arredondarParaDuasCasas } from '../../services/functions/formatacao'

const repository = new TaxRepository()

export class SimulationService {
  async simulate(data: SimulateData): Promise<SimulationResult> {
    const tax = await repository.findExisting({
      installmentsNumber: data.installmentsNumber,
      cardFlag: data.cardFlag,
      type: data.type,
      bankName: data.bankName,
      locationId: data.locationId
    })

    if (!tax) {
      throw new ResponseError('Taxa não encontrada', 404)
    }

    let valorParcelas: number
    let valorRecebido: number
    let passaNoCartao: number
    let taxPercentage = Number(tax.value)

    if (taxPercentage >= 1) {
      taxPercentage = taxPercentage / 100
    }

    const taxRateFormated = Number((taxPercentage).toFixed(6))
    const parcelas = data.installmentsNumber
    const taxPercentageFormated = Number((taxPercentage * 100).toFixed(2))

  
    console.log('Taxa formatada:', taxRateFormated)

    let valorCalculo = data.amount
    let taxaCalculada = arredondarParaDuasCasas(
      valorCalculo * taxRateFormated
    )

    if (tax.type === 'LIBERADO') {
      // Usuário informa quanto quer receber

      valorRecebido = valorCalculo
      
      const paidAmount = taxaCalculada + valorCalculo

      valorParcelas = arredondarParaDuasCasas(
        paidAmount / parcelas
      )

      passaNoCartao = paidAmount

    } else {
      // Usuário informa quanto vai passar no cartão
      
      valorRecebido = valorCalculo - taxaCalculada

      valorParcelas = arredondarParaDuasCasas(
        valorCalculo / parcelas
      )

      passaNoCartao = valorCalculo
    }

    return {
      amount: data.amount,
      installmentNumber: parcelas,
      installmentAmount: valorParcelas,
      taxPercentage: taxPercentageFormated,
      tax: taxRateFormated,
      taxaCalculada,
      passaNoCartao,
      receivedAmount: valorRecebido
    }
  }
}