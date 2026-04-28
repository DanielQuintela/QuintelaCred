import { Router } from 'express'
import { authRoutes } from '../modules/auth/routes/auth.routes'
import { financeRoutes } from '../modules/finance/finance.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/finance', financeRoutes)

export { router }