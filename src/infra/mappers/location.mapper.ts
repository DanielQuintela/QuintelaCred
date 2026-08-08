import { Location } from "@prisma/client";

export function locationMapper(location: Location) {
    return {
        id: location.id,
        name: location.name,
        city: location.city,
        state: location.state,
        is_active: location.is_active,
        createdAt: location.created_at,
        updatedAt: location.updated_at,
    }
}