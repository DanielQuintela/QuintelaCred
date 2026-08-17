import { Router } from "express"
import { UserController } from "../user.controller"
import { adminMiddleware, authMiddleware } from "../../../middlewares/auth"
import { validateDto } from "../../../middlewares"
import { createUserSchema } from "../schemas"

const router = Router()

const controller = new UserController()

router.get('/',    authMiddleware, adminMiddleware, controller.findMany)
router.get('/:id', authMiddleware, adminMiddleware, controller.findById)
//TODO: PRECISO REVOMER A SENHA DA CHAMADA DESSA REQUISIÇÃO
router.put('/:id', authMiddleware, adminMiddleware, validateDto(createUserSchema), controller.update)
router.delete('/:id', authMiddleware, adminMiddleware, controller.delete)
router.patch('/:id/status', authMiddleware, adminMiddleware, controller.updateStatus)
router.patch('/:id/password', authMiddleware, controller.updatePassword)
router.patch('/:id/first-login', authMiddleware, controller.updateFirstLogin)

export { router as userRoutes }