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
      bankName: data.bankName
    })

    if (!tax) {
      throw new ResponseError('Tax not found', 404)
    }

    let grossAmount: number
    let installmentAmount: number
    let taxValue: number
    let recivedAmount: number

    const taxPercentage = Number(tax.value)
    const taxRate = taxPercentage / 100

    if (tax.type === 'LIBERADO') {
      // Usuário informa quanto quer receber
      grossAmount = arredondarParaDuasCasas(
        data.amount * (1 + taxRate)
      )

      installmentAmount = arredondarParaDuasCasas(
        grossAmount / data.installmentsNumber
      )

      taxValue = arredondarParaDuasCasas(
        grossAmount - data.amount
      )

      recivedAmount = data.amount

    } else {
      // Usuário informa quanto vai passar no cartão
      grossAmount = data.amount

      installmentAmount = arredondarParaDuasCasas(
        grossAmount / data.installmentsNumber
      )

      recivedAmount = arredondarParaDuasCasas(
        grossAmount * (1 - taxRate)
      )

      taxValue = arredondarParaDuasCasas(
        grossAmount - recivedAmount
      )
    }

    return {
      amount: data.amount,
      installmentNumber: data.installmentsNumber,
      installmentAmount,
      taxPercentage,
      taxValue,
      recivedAmount
    }
  }
}