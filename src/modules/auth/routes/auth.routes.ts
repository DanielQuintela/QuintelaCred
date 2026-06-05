import { Router } from 'express'
import { AuthController } from '../auth.controller'
import { validateDto } from '../../../middlewares'
import { registerSchema, loginSchema } from '../schemas'
import { authMiddleware } from '../../../middlewares/auth'

const router = Router()
const controller = new AuthController()

router.post('/register', validateDto(registerSchema), controller.register)
router.post('/login', validateDto(loginSchema), controller.login)
router.get('/user', authMiddleware, controller.findMe)

export { router as authRoutes }