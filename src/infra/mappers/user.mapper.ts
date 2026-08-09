import { User } from "@prisma/client";

export function userMapper(user: User) {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
    }
}