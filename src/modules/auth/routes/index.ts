import { Router } from 'express'
import { authRoutes } from './auth.routes'
import { financeRoutes } from './finance.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/finance', financeRoutes)

export { router }