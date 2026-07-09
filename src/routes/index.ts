import { Router } from 'express'
import { authRoutes } from '../modules/auth/routes/auth.routes'
import { simulationRoutes } from '../modules/simulation/routes/simulation.routes'
import { taxRoutes } from '../modules/tax/routes/tax.routes'
import { userRoutes } from '../modules/users/routes/user.routes'

const router = Router()

router.get('/', (req, res) => {
  res.send('API Quintela Cred ON')
})
router.use('/auth', authRoutes)
router.use('/simulation', simulationRoutes)
router.use('/tax', taxRoutes)
router.use('/user', userRoutes)

export { router }