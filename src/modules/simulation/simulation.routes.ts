import { Router } from 'express'
import { authMiddleware } from '../../middlewares/auth'

const router = Router()

router.post('/calculate', authMiddleware)

export { router as simulationRoutes }
