import { Router } from 'express'
import { AuthController } from '../auth.controller'
import { validateDto } from '../../../middlewares'
import { registerSchema, loginSchema, registerAdminSchema } from '../schemas'
import { adminMiddleware, authMiddleware } from '../../../middlewares/auth'

const router = Router()
const controller = new AuthController()

router.post('/register', authMiddleware, adminMiddleware, validateDto(registerSchema), controller.register)
router.post('/login', validateDto(loginSchema), controller.login)
router.get('/user', authMiddleware, controller.findMe)
router.post('/admin', validateDto(registerAdminSchema), controller.registerAdmin)

export { router as authRoutes }