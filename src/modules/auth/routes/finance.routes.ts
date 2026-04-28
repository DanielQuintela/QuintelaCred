import { Router } from 'express'
// import { calculate } from './finance.controller'
import { authMiddleware } from '../../../middlewares'

const router = Router()

router.post('/calculate', authMiddleware)

export { router as financeRoutes }
