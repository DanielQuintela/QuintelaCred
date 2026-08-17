import { CreateUserData } from "../../@types/user.type";
import { createAuditLog } from "../../infra/shared/utils/audit";
import { ResponseError } from "../../middlewares";
import { UserRepository } from "./user.repository";
import bcrypt from 'bcryptjs'


const repository = new UserRepository()

export class UserService {
   
    async findMany() {
        return repository.findMany()
    }

    async findById(id: string) {
        const user = await repository.findById(id)
        if (!user) {
            throw new ResponseError('Usuário não encontrado')
        }

        return user
    }

    async update(id: string, data: Partial<CreateUserData>, userId: string) {   
        const user = await repository.findById(id)

        if (!user) {
            throw new ResponseError('Usuário não encontrado')
        }

        const updatedUser = await repository.update(id, data)

        createAuditLog({
            table_name: 'user',
            record_id: updatedUser.id,
            action: 'UPDATE',
            user_id: userId,
            old_values: user,
            new_values: updatedUser
        })

        return updatedUser
    }

    async delete(id: string, userId: string) {
        const user = await repository.findById(id)

        if (!user) {
            throw new ResponseError('Usuário não encontrado')
        }
        
        if (userId === id) {
            throw new ResponseError('Não é possível deletar o próprio usuário', 403)
        }

        await repository.delete(id)

        createAuditLog({
            table_name: 'user',
            record_id: user.id,
            action: 'DELETE',
            user_id: userId,
            old_values: user,
            new_values: null
        })
    }

    async updateStatus(id: string, userId: string) {
        const user = await repository.findById(id)

        if (!user) {
            throw new ResponseError('Usuário não encontrado')
        }

        if (userId === id) {
            throw new ResponseError('Não é possível alterar o status do próprio usuário', 403)
        }

        user.status = user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"

        const updatedUser = await repository.updateStatus(id, user.status)

        createAuditLog({
            table_name: 'user',
            record_id: user.id,
            action: 'UPDATE_STATUS',
            user_id: userId,
            old_values: user,
            new_values: { ...user, status: user.status }
        })

        return updatedUser
    }

    async updatePassword(id: string, newPassword: string, currentPassword: string, userId: string) {
        const user = await repository.findById(id)

        if (!user) {
            throw new ResponseError('Usuário não encontrado')
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password)

        if (!isMatch) {
            throw new ResponseError('Senha atual incorreta')
        }

        const hashedPassword = await bcrypt.hash(newPassword, 8)

        const updatedUser = await repository.updatePassword(id, hashedPassword)

        createAuditLog({
            table_name: 'user',
            record_id: user.id,
            action: 'UPDATE',
            user_id: userId,
            old_values: user,
            new_values: updatedUser
        })

        return updatedUser
    }

    async updateFirstLogin(id: string, firstLogin: boolean) {
        const user = await repository.findById(id)

        if (!user) {
            throw new ResponseError('Usuário não encontrado')
        }

      

        const updatedUser = await repository.updateFirstLogin(id, firstLogin)

        createAuditLog({
            table_name: 'user',
            record_id: user.id,
            action: 'UPDATE',
            user_id: id,
            old_values: user,
            new_values: updatedUser
        })

        return updatedUser
    }
}