import { CreateUserData } from "../../@types/user.type";
import { prisma } from "../../infra/lib/prisma";

export class UserRepository {
    async create(data: CreateUserData) {
        return prisma.user.create({
            data: {
                email: data.email,
                password: data.password,
                name: data.name,
                role: data.role,
                status: data.status,
            }
        });
    }

    async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email }
        });
    }

    async findById(id: string) {
        return prisma.user.findUnique({
            where: { id }
        });
    }

    async update(id: string, data: Partial<CreateUserData>) {
        return prisma.user.update({
            where: { id },
            data: {
                email: data.email,
                password: data.password,
                name: data.name,
                role: data.role,
                status: data.status,
            }
        });
    }

    async delete(id: string) {
        return prisma.user.delete({
            where: { id }
        });
    }

    async findMany() {
        return prisma.user.findMany({
            orderBy: {
                name: 'asc'
            }
        });
    }

    async updateStatus(id: string, status: "ACTIVE" | "INACTIVE") {
        return prisma.user.update({
            where: { id },
            data: {
                status: status
            }
        });
    }
}