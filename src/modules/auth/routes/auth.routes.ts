import { Router } from 'express'
import { AuthController } from '../auth.controller'
import { validateDto } from '../../../middlewares'
import { registerSchema, loginSchema } from '../schemas'

const router = Router()
const controller = new AuthController()

router.post('/register', validateDto(registerSchema), controller.register.bind(controller))
router.post('/login', validateDto(loginSchema), controller.login.bind(controller))

export { router as authRoutes }