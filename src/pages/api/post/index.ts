import {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from '../../../server/db/client'
import requireAuthorization from '../../../server/common/requireAuthorization'
import {SessionUser} from '../../../types/session-user'

export default requireAuthorization(async (req: NextApiRequest, res: NextApiResponse, sessionUser: SessionUser) => {
    // Get list of posts
    if (req.method === 'GET') {
        // Get list of user friend's IDs
        const friendIds = await getFriendIds(sessionUser)
        // Get posts belonging to the user or their friends
        const posts = await getPostsByUserAndFriends(sessionUser, friendIds)
        res.status(200).json(posts)
        return
    }
    // Create a new post
    if (req.method === 'POST') {
        const {content} = req.body as { content: string }
        await createPost(sessionUser, content)
        res.status(200).redirect('/')
        return
    }
    // Invalid method
    res.status(405).end()
})

async function getFriendIds(sessionUser: SessionUser) {
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

async function getPostsByUserAndFriends(sessionUser: SessionUser, friendIds: string[]) {
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

async function createPost(sessionUser: SessionUser, content: string) {
    return prisma.post.create({
        data: {
            authorId: sessionUser.id,
            content: content,
        },
    })
}