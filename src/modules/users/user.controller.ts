import { Request, Response } from "express";
import { UserService } from "./user.service";
import { userMapper } from "../../infra/mappers/user.mapper";

const service = new UserService()

export class UserController {
    async create(req: Request, res: Response) {
        const data = req.body
        const user = await service.create(data)

        return res.status(201).json(userMapper(user))
    }

    async findMany(_req: Request, res: Response) {
        const users = await service.findMany()
        return res.json(users.map(userMapper))
    }

    async findById(req: Request, res: Response) {
        const id = req.params.id as string
        const user = await service.findById(id)

        return res.json(userMapper(user))
    }

    async update(req: Request, res: Response) {
        const id = req.params.id as string
        const data = req.body
        const user = await service.update(id, data)

        return res.json(userMapper(user))
    }

    async delete(req: Request, res: Response) {
        const id = req.params.id as string
        await service.delete(id)

        return res.status(204).end()
    }

    async updateStatus(req: Request, res: Response) {
        const id = req.params.id as string
        const user = await service.updateStatus(id)

        return res.json(userMapper(user))
    }
}