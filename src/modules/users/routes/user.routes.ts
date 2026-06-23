import { Router } from "express"
import { UserController } from "../user.controller"
import { adminMiddleware, authMiddleware } from "../../../middlewares/auth"
import { validateDto } from "../../../middlewares"
import { createUserSchema } from "../schemas"

const router = Router()

const controller = new UserController()

router.post('/',   authMiddleware, adminMiddleware, validateDto(createUserSchema), controller.create)
router.get('/',    authMiddleware, adminMiddleware, controller.findMany)
router.get('/:id', authMiddleware, adminMiddleware, controller.findById)
router.put('/:id', authMiddleware, adminMiddleware, validateDto(createUserSchema), controller.update)
router.delete('/:id', authMiddleware, adminMiddleware, controller.delete)
router.patch('/:id/status', authMiddleware, adminMiddleware, controller.updateStatus)

export { router as userRoutes }