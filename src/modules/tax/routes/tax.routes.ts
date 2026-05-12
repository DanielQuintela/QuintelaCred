import { Router } from 'express'

import { TaxController } from '../tax.controller'

import { adminMiddleware, authMiddleware } from '../../../middlewares/auth'
import { validateDto } from '../../../middlewares'

import { createTaxSchema, updateTaxSchema } from '../schemas'

const router = Router()

const controller = new TaxController()

router.post('/create',   authMiddleware, adminMiddleware, validateDto(createTaxSchema), controller.create)
router.get('/find',    authMiddleware, controller.findMany)
router.get('/find-existing', authMiddleware, controller.findExisting)
router.put('/update',    authMiddleware, adminMiddleware, validateDto(updateTaxSchema), controller.update)
router.delete('/delete/:id', authMiddleware, adminMiddleware, controller.delete)

export { router as taxRoutes }