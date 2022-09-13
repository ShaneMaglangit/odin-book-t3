import {prisma} from './client'
import {Friendship} from '../../types/friendship'

export async function getFriendshipByUserIdAndFriendId(userId: string, friendId: string) {
    return prisma.friendship.findFirst({
        where: {
            OR: [
                {userId: userId, friendId: friendId},
                {userId: friendId, friendId: userId},
            ]
        }
    })
}

export async function createFriendship(userId: string, friendId: string) {
    return prisma.friendship.create({
        data: {
            userId: userId,
            friendId: friendId,
        }
    })
}

export async function getPendingFriendship(userId: string) {
    return prisma.friendship.findMany({
        where: {friendId: userId, pending: true},
        include: {
            friend: {
                select: {
                    id: true,
                    name: true,
                    image: true
                }
            }
        }
    })
}

export async function acceptFriendshipById(friendshipId: string) {
    return prisma.friendship.update({
        where: {id: friendshipId},
        data: {pending: false}
    })
}

export async function rejectFriendshipById(friendshipId: string) {
    return prisma.friendship.delete({where: {id: friendshipId}})
}

export async function getFriendshipById(friendshipId: string): Promise<Friendship | null> {
    return prisma.friendship.findUnique({where: {id: friendshipId}})
}