import { Request, Response } from "express";
import { UserService } from "./user.service";
import { userMapper } from "../../infra/mappers/user.mapper";

const service = new UserService()

export class UserController {

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
        console.log("updating user", req.params.id, req.body)
        const id = req.params.id as string
        const data = req.body
        const user = await service.update(id, data, req.user.userId)

        return res.json(userMapper(user))
    }

    async delete(req: Request, res: Response) {
        const id = req.params.id as string
        await service.delete(id, req.user.userId)

        return res.status(204).end()
    }

    async updateStatus(req: Request, res: Response) {
        const id = req.params.id as string
        let userId = req.user.userId
    
        const user = await service.updateStatus(id, userId)

        return res.json(userMapper(user))
    }

    async updatePassword(req: Request, res: Response) {
        const id = req.params.id as string
        const { newPassword, currentPassword } = req.body
        let userId = req.user.userId

        const user = await service.updatePassword(id, newPassword, currentPassword, userId)

        return res.json(userMapper(user))
    }

    async updateFirstLogin(req: Request, res: Response) {
        const id = req.params.id as string
        const { firstLogin } = req.body
        const user = await service.updateFirstLogin(id, firstLogin)

        return res.json(userMapper(user))
    }
}