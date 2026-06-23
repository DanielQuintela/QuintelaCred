import { CreateUserData } from "../../@types/user.type";
import { UserRepository } from "./user.repository";


const repository = new UserRepository()

export class UserService {
    async create(data: CreateUserData) {
        const userExists = await repository.findByEmail(data.email)

        if (userExists) {
            throw new Error('Já existe um usuário cadastrado com este e-mail')
        }   

        return repository.create(data)
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

    async update(id: string, data: Partial<CreateUserData>) {   
        const user = await repository.findById(id)

        if (!user) {
            throw new Error('Usuário não encontrado')
        }

        return repository.update(id, data)
    }

    async delete(id: string) {
        const user = await repository.findById(id)

        if (!user) {
            throw new Error('Usuário não encontrado')
        }   

        await repository.delete(id)
    }

    async updateStatus(id: string,) {
        const user = await repository.findById(id)

        if (!user) {
            throw new Error('Usuário não encontrado')
        }

        user.status = user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"

        return repository.updateStatus(id, user.status)
    }
}