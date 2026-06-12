import { Router } from 'express'

import { TaxController } from '../tax.controller'

import { adminMiddleware, authMiddleware } from '../../../middlewares/auth'
import { validateDto } from '../../../middlewares'

import { createTaxSchema, updateTaxSchema } from '../schemas'

const router = Router()

const controller = new TaxController()

router.post('/',   authMiddleware, adminMiddleware, validateDto(createTaxSchema), controller.create)
router.get('/',    authMiddleware, controller.findMany)
router.get('/find', authMiddleware, controller.findExisting)
router.put('/update',    authMiddleware, adminMiddleware, validateDto(updateTaxSchema), controller.update)
router.delete('/delete', authMiddleware, adminMiddleware, controller.delete)

export { router as taxRoutes }