import { User } from "@prisma/client";

export function userMapper(user: User) {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status,
        createdAt: user.create_at,
        updatedAt: user.update_at,
    }
}