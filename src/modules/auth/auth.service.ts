import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../../lib/prisma'
import { ResponseError } from '../../middlewares'
import { LoginData, RegisterData } from '../../@types/auth.type'


export class AuthService {
  async register(data: RegisterData) {
    const { name, email, password } = data
    
    if (!name || !email || !password) {
      throw new ResponseError('Missing fields', 400)
    }

    const userExists = await prisma.user.findUnique({
      where: { email }
    })

    if (userExists) {
      throw new ResponseError('User already exists', 409)
    }

    const hashedPassword = await bcrypt.hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'USER'
      }
    })

    return {
      id: user.id,
      email: user.email,
      name: user.name
    }
  }

  async login(data: LoginData) {
    const { email, password } = data
    if (!email || !password) {
      throw new ResponseError('Missing fields', 400)
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
       throw new ResponseError('Invalid credentials', 401)
    }

    if (user.status !== 'ACTIVE') {
      throw new ResponseError('User inactive', 401)
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      throw new ResponseError('Invalid credentials', 401)
    }

    if (!process.env.JWT_SECRET) {
      throw new ResponseError('JWT secret not defined', 500)
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    return { token }
  }
}