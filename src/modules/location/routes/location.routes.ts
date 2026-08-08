import { Router } from "express";

import { LocationController } from "../location.controller";

import { adminMiddleware, authMiddleware } from "../../../middlewares/auth";


const router = Router()

const controller = new LocationController()

router.post('/', authMiddleware, adminMiddleware, controller.create)
router.get('/', authMiddleware, controller.findMany)
router.get('/find', authMiddleware, controller.findExisting)
router.get('/:id', authMiddleware, controller.findById)
router.put('/:id', authMiddleware, adminMiddleware, controller.update)
router.delete('/:id', authMiddleware, adminMiddleware, controller.delete)
router.patch('/:id/status', authMiddleware, adminMiddleware, controller.updateStatus)

export { router as locationRoutes }