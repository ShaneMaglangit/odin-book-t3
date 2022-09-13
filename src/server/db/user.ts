import {prisma} from './client'

export async function getUserById(id: string) {
    return prisma.user.findFirst({
        where: {
            id: id
        },
        select: {
            id: true,
            name: true,
            image: true,
            email: true,
        }
    })
}

export async function getUsersExcludeCurrentById(id: string) {
    return prisma.user.findMany({
        where: {id: {not: id}},
        select: {
            _count: {
                select: {
                    primaryFriendships: {where: {friendId: id}},
                    secondaryFriendships: {where: {userId: id}},
                }
            },
            id: true,
            name: true,
            image: true,
            email: true,
        }
    })
}
