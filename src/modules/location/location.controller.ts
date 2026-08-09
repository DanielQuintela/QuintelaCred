import { Request, Response } from "express";
import { RegisterLocationData } from "../../@types/location.type";
import { LocationService } from "./locaion.service";
import { locationMapper } from "../../infra/mappers/location.mapper";


const service = new LocationService()

export class LocationController {

    create = async (req: Request, res: Response) => {
        const body: RegisterLocationData = req.body

        const location = await service.create(body, req)

        return res.status(201).json(location)
    }

    findExisting = async (req: Request, res: Response) => {
        const query = req.query as unknown as RegisterLocationData

        const location = await service.findExisting(query)

        return res.json(location)
    }

    findMany = async (_req: Request, res: Response) => {
        const locations = await service.findMany()

        return res.json(locations.map(locationMapper))
    }

    findById = async (req: Request, res: Response) => {
        const id = req.params.id as string
        const location = await service.findById(id)

        return res.json(locationMapper(location))
    }

    update = async (req: Request, res: Response) => {
        const id = req.params.id as string
        const body: RegisterLocationData = req.body

        const location = await service.update(id, body, req)

        return res.json(locationMapper(location))
    }

    delete = async (req: Request, res: Response) => {
        const id = req.params.id as string
        await service.delete(id, req)

        return res.status(204).end()
    }

    updateStatus = async (req: Request, res: Response) => {
        const id = req.params.id as string
        const { is_active } = req.body

        const location = await service.updateStatus(id, is_active, req)

        return res.json(locationMapper(location))
    }    
}