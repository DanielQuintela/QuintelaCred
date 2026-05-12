import { Request, Response } from 'express'

import { SimulationService } from './simulation.service'

const service = new SimulationService()

export class SimulationController {
  simulate = async (req: Request, res: Response) => {
    const result = await service.simulate(req.body)

    return res.json(result)
  }
}