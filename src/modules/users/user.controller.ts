import { Request, Response } from "express";
import { UserService } from "./user.service";

const service = new UserService()

export class UserController {
    async create(req: Request, res: Response) {
        const data = req.body
        const user = await service.create(data)

        return res.status(201).json(user)
    }

    async findMany(_req: Request, res: Response) {
        const users = await service.findMany()
        return res.json(users)
    }

    async findById(req: Request, res: Response) {
        const id = req.params.id as string
        const user = await service.findById(id)

        return res.json(user)
    }

    async update(req: Request, res: Response) {
        const id = req.params.id as string
        const data = req.body
        const user = await service.update(id, data)

        return res.json(user)
    }

    async delete(req: Request, res: Response) {
        const id = req.params.id as string
        await service.delete(id)

        return res.status(204).end()
    }

    async updateStatus(req: Request, res: Response) {
        const id = req.params.id as string
        const { status } = req.body
        const user = await service.updateStatus(id, status)
        
        return res.json(user)
    }
}