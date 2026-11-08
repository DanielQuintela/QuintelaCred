import { RegisterLocationData } from "../../@types/location.type";
import { createAuditLog } from "../../infra/shared/utils/audit";
import { ResponseError } from "../../middlewares";
import { LocationRepository } from "./location.repository";

const locationRepository = new LocationRepository()

export class LocationService {

    async create(data: RegisterLocationData, req: any) {

        const locationExists = await locationRepository.findExisting(data)

        if (locationExists) {
            throw new ResponseError(
                'Localização já cadastrada', 409
            )
        }

        const location = await locationRepository.create(data)

        createAuditLog({
            table_name: 'location',
            record_id: location.id,
            action: 'CREATE',
            user_id: req.user.userId,
            old_values: null,
            new_values: data
        })

        return location
    }

    async findMany() {
        return locationRepository.findMany()
    }

    async findById(id: string) {
        const location = await locationRepository.findById(id)

        if (!location) {
            throw new ResponseError('Localização não encontrada', 404)
        }

        return location
    }

    async findExisting(data: RegisterLocationData) {
        return locationRepository.findExisting(data)
    }

    async update(id: string, data: RegisterLocationData, req: any) {
        const locationExists = await locationRepository.findById(id)

        if (!locationExists) {
            throw new ResponseError('Localização não encontrada', 404)
        }

        const locationSameExists = await locationRepository.findExisting(data)

        if (locationSameExists) {
            throw new ResponseError(
                'Já existe uma localização cadastrada com este nome', 409
            )
        }

        const location = await locationRepository.update(id, data)

        createAuditLog({
            table_name: 'location',
            record_id: locationExists.id,
            action: 'UPDATE',
            user_id: req.user.userId,
            old_values: locationExists,
            new_values: data
        })

        return location
    }
    
    async delete(id: string, req: any) {
        const locationExists = await locationRepository.findById(id)

        if (!locationExists) {
            throw new ResponseError('Localização não encontrada', 404)
        }

        const location = await locationRepository.delete(id)

        createAuditLog({
            table_name: 'location',
            record_id: location.id,
            action: 'DELETE',
            user_id: req.user.userId,
            old_values: locationExists,
            new_values: null
        })

        return location
    }

    async updateStatus(id: string, is_active: boolean, req: any) {
        const locationExists = await locationRepository.findById(id)

        if (!locationExists) {
            throw new ResponseError('Localização não encontrada', 404)
        }

        const location = await locationRepository.updateStatus(id, is_active)

        createAuditLog({
            table_name: 'location',
            record_id: location.id,
            action: 'UPDATE',
            user_id: req.user.userId,
            old_values: locationExists,
            new_values: { ...locationExists, is_active }
        })

        return location
    }
}