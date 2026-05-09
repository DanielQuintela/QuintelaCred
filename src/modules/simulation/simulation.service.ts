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
   
    const taxPercentage = Number(tax.value)

    const taxRate = taxPercentage / 100    

    const grossAmount = arredondarParaDuasCasas(data.amount * (1 + taxRate))

    const installmentAmount = arredondarParaDuasCasas(grossAmount / data.installmentsNumber)

    const taxValue = arredondarParaDuasCasas(grossAmount - data.amount)


    return {
      reciveAmount: data.amount,
      installmentNumber: data.installmentsNumber,
      installmentAmount,
      taxPercentage,
      taxValue
    }
  }
}