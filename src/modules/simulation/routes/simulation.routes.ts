import { Router } from 'express'
import { authMiddleware } from '../../../middlewares/auth'
import { SimulationController } from '../simulation.controller'
import { validateDto } from '../../../middlewares'
import { simulationSchema } from '../simulation.schemas'

const router = Router()

const controller = new SimulationController()

router.post('/', authMiddleware, validateDto(simulationSchema), controller.simulate)

export { router as simulationRoutes }
