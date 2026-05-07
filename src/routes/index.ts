import { Router } from 'express'
import { authRoutes } from '../modules/auth/routes/auth.routes'
import { financeRoutes } from '../modules/finance/finance.routes'

const router = Router()

router.get('/', (req, res) => {
  res.send('API Quintela Cred ON')
})
router.use('/auth', authRoutes)
router.use('/finance', financeRoutes)

export { router }