import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../../infra/lib/prisma'
import { ResponseError } from '../../middlewares'
import { LoginData, RegisterData } from '../../@types/auth.type'


export class AuthService {
  async register(data: RegisterData) {
    const { name, email, password, role, status } = data
    
    const userExists = await prisma.user.findUnique({
      where: { email }
    })

    if (userExists) {
      throw new ResponseError('Usuário já existe', 409)
    }

    const hashedPassword = await bcrypt.hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role,
        status: status
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
   
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
       throw new ResponseError('Credenciais inválidas', 401)
    }

    if (user.status !== 'ACTIVE') {
      throw new ResponseError('Usuário inativo', 401)
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      throw new ResponseError('Credenciais inválidas', 401)
    }

    if (!process.env.JWT_SECRET) {
      throw new ResponseError('JWT secret not defined', 500)
    }

    const token = jwt.sign(
      { userId: user.id, userEmail: user.email, userName: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    return { token }
  }

  async FindMe(userId: string){
    return await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        name: true,
        email: true,
        role: true,
        status: true
      }
    })
  }
}