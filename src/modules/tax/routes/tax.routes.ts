import { Router } from 'express'

import { TaxController } from '../tax.controller'

import { adminMiddleware, authMiddleware } from '../../../middlewares/auth'
import { validateDto } from '../../../middlewares'

import { createTaxSchema, updateTaxSchema } from '../schemas'

const router = Router()

const controller = new TaxController()

router.post('/createTax',   authMiddleware, adminMiddleware, validateDto(createTaxSchema), controller.create)
router.get('/findTaxes',    authMiddleware, controller.findMany)
router.get('/findExisting', authMiddleware, controller.findExisting)
router.put('/updateTax',    authMiddleware, adminMiddleware, validateDto(updateTaxSchema), controller.update)
router.delete('/deleteTax', authMiddleware, adminMiddleware, controller.delete)

export { router as taxRoutes }