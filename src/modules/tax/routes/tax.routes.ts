import { Router } from 'express'

import { TaxController } from '../tax.controller'

import { adminMiddleware, authMiddleware } from '../../../middlewares/auth'
import { validateDto } from '../../../middlewares'

import { createTaxSchema, updateTaxSchema } from '../schemas'

const router = Router()

const controller = new TaxController()

router.post('/createTax',   authMiddleware, adminMiddleware, validateDto(createTaxSchema), controller.create.bind(controller))
router.get('/findTaxes',    authMiddleware, controller.findMany.bind(controller))
router.get('/findExisting', authMiddleware, controller.findExisting.bind(controller))
router.put('/updateTax',    authMiddleware, adminMiddleware, validateDto(updateTaxSchema), controller.update.bind(controller))
router.delete('/deleteTax', authMiddleware, adminMiddleware, controller.delete.bind(controller))

export { router as taxRoutes }