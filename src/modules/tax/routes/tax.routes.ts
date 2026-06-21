import { Router } from 'express'

import { TaxController } from '../tax.controller'

import { adminMiddleware, authMiddleware } from '../../../middlewares/auth'
import { validateDto } from '../../../middlewares'

import { createTaxSchema, updateTaxSchema } from '../schemas'

const router = Router()

const controller = new TaxController()

router.post('/',   authMiddleware, adminMiddleware, validateDto(createTaxSchema), controller.create)
router.get('/',    authMiddleware, controller.findMany)
router.get('/:id', authMiddleware, controller.findById)
router.get('/find', authMiddleware, controller.findExisting)
router.put('/:id',   authMiddleware, adminMiddleware, validateDto(updateTaxSchema), controller.update)
router.delete('/:id', authMiddleware, adminMiddleware, controller.delete)

export { router as taxRoutes }