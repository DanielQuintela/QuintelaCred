import { CreateUserData } from "../../@types/user.type";
import { createAuditLog } from "../../infra/shared/utils/audit";
import { UserRepository } from "./user.repository";


const repository = new UserRepository()

export class UserService {
    async create(data: CreateUserData, req: any) {
        const userExists = await repository.findByEmail(data.email)

        if (userExists) {
            throw new Error('Já existe um usuário cadastrado com este e-mail')
        }   

          
        const user = await repository.create(data)

        createAuditLog({
        table_name: 'user',
        record_id: user.id,
        action: 'CREATE',
        user_id: req.user.userId,
        old_values: null,
        new_values: data
        })

        return user
    }

    async findMany() {
        return repository.findMany()
    }

    async findById(id: string) {
        const user = await repository.findById(id)
        if (!user) {
            throw new Error('Usuário não encontrado')
        }

        return user
    }

    async update(id: string, data: Partial<CreateUserData>, req: any) {   
        const user = await repository.findById(id)

        if (!user) {
            throw new Error('Usuário não encontrado')
        }

        const updatedUser = await repository.update(id, data)

        createAuditLog({
            table_name: 'user',
            record_id: updatedUser.id,
            action: 'UPDATE',
            user_id: req.user.userId,
            old_values: user,
            new_values: updatedUser
        })

        return updatedUser
    }

    async delete(id: string, req: any) {
        const user = await repository.findById(id)

        if (!user) {
            throw new Error('Usuário não encontrado')
        }   

        await repository.delete(id)

        createAuditLog({
            table_name: 'user',
            record_id: user.id,
            action: 'DELETE',
            user_id: req.user.userId,
            old_values: user,
            new_values: null
        })
    }

    async updateStatus(id: string, req: any) {
        const user = await repository.findById(id)

        if (!user) {
            throw new Error('Usuário não encontrado')
        }

        user.status = user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"

        const updatedUser = await repository.updateStatus(id, user.status)

        createAuditLog({
            table_name: 'user',
            record_id: user.id,
            action: 'UPDATE_STATUS',
            user_id: req.user.userId,
            old_values: user,
            new_values: { ...user, status: user.status }
        })

        return updatedUser
    }
}