import {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from '../../../server/db/client'
import {Session} from 'next-auth'
import requireAuthorization from '../../../server/common/requireAuthorization'

export default requireAuthorization(async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    if (req.method === 'GET') {
        const posts = await prisma.post.findMany({
            // Select posts that either is posted by the current user or their friends.
            where: {
                OR: [
                    {authorId: {equals: session!.user!.id}},
                    {
                        author: {
                            OR: [{
                                primaryFriendships: {
                                    some: {
                                        OR: [
                                            {friendId: {equals: session!.user!.id}},
                                            {userId: {equals: session!.user!.id}},
                                        ]
                                    }
                                },
                                secondaryFriendships: {
                                    some: {
                                        OR: [
                                            {friendId: {equals: session!.user!.id}},
                                            {userId: {equals: session!.user!.id}},
                                        ]
                                    }
                                }
                            }]
                        }
                    }
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
    res.status(405).end()
})