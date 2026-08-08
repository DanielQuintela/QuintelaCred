
import { RegisterLocationData } from "../../@types/location.type";
import { prisma } from "../../infra/lib/prisma";

export class LocationRepository {

    async create(data: RegisterLocationData) {
        return prisma.location.create({
            data: {
                name: data.name,
                city: data.city,
                state: data.state,
                is_active: data.is_active
            }
        })
    }

    async findMany() {
        return prisma.location.findMany({
            orderBy: {
                name: 'asc',
            },
        })
    }

    async findById(id: string) {
        return prisma.location.findUnique({
            where: { id },
        })
    }

    async findExisting(data: RegisterLocationData) {
        return prisma.location.findFirst({
            where: {
                name: data.name,
                city: data.city,
                state: data.state
            }
        })
    }

    async update(id: string, data: RegisterLocationData) {
        return prisma.location.update({
            where: { id },
            data: {
                name: data.name,
                city: data.city,
                state: data.state,
                is_active: data.is_active
            }
        })
    }

    async delete(id: string) {
        return prisma.location.delete({
            where: { id },
        })
    }

    async updateStatus(id: string, is_active: boolean) {
        return prisma.location.update({
            where: { id },
            data: {
                is_active: is_active
            }
        })
    }

}