import {prisma} from './client'
import {SessionUser} from '../../types/session-user'

export async function getPostsByUserId(userId: string) {
    return prisma.post.findMany({
        where: {
            authorId: userId,
        },
        include: {
            author: {
                select: {name: true, image: true}
            },
            comments: {
                select: {
                    content: true,
                    author: {
                        select: {name: true, image: true}
                    },
                    createdAt: true
                },
                orderBy: {createdAt: 'desc'}
            }
        },
        orderBy: {createdAt: 'desc'}
    })
}

export async function getFriendIds(sessionUser: SessionUser) {
    return prisma.friendship
        .findMany({
            where: {
                OR: [
                    {userId: sessionUser.id, pending: false},
                    {friendId: sessionUser.id, pending: false},
                ]
            },
            select: {userId: true, friendId: true}
        }).then<string[]>(friendships =>
            friendships.map(friendship =>
                friendship.userId === sessionUser.id ? friendship.friendId : friendship.userId
            )
        )
}

export async function getPostsByUserAndFriends(sessionUser: SessionUser, friendIds: string[]) {
    return prisma.post.findMany({
        where: {
            OR: [
                {authorId: sessionUser.id},
                {authorId: {in: friendIds}},
            ]
        },
        include: {
            author: {
                select: {name: true, image: true}
            },
            comments: {
                select: {
                    content: true,
                    author: {
                        select: {name: true, image: true}
                    },
                    createdAt: true
                }
            }
        },
    })
}

export async function createPost(sessionUser: SessionUser, content: string) {
    return prisma.post.create({
        data: {
            authorId: sessionUser.id,
            content: content,
        },
    })
}

export async function likePost(postId: string) {
    return prisma.post.update({
        where: {id: postId},
        data: {likes: {increment: 1}}
    })
}