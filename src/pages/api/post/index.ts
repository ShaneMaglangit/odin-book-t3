import {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from '../../../server/db/client'
import {Session} from 'next-auth'
import requireAuthorization from '../../../server/common/requireAuthorization'

export default requireAuthorization(async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    // Get list of posts
    if (req.method === 'GET') {
        // Get list of user friend's IDs
        const friendsIds = await prisma.friendship
            .findMany({
                where: {
                    OR: [
                        {userId: session!.user!.id, pending: false},
                        {friendId: session!.user!.id, pending: false},
                    ]
                },
                select: {
                    userId: true,
                    friendId: true,
                }
            }).then<string[]>(friendships =>
                friendships.map(friendship =>
                    friendship.userId === session!.user!.id ? friendship.friendId : friendship.userId
                )
            )

        // Get posts belonging to the user or their friends
        const posts = await prisma.post.findMany({
            where: {
                OR: [
                    {authorId: {equals: session!.user!.id}},
                    {authorId: {in: friendsIds}},
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
        res.status(200).json(posts)
        return
    }
    // Create a new post
    if (req.method === 'POST') {
        const {content} = req.body as { content: string }
        await prisma.post.create({
            data: {
                authorId: session!.user!.id,
                content: content,
            },
        })
        res.status(200).redirect('/')
        return
    }
    // Invalid method
    res.status(405).end()
})