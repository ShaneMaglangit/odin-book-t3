import {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from '../../../server/db/client'
import {Session} from 'next-auth'
import requireAuthorization from '../../../server/common/requireAuthorization'

export default requireAuthorization(async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    if (req.method === 'GET') {
        const posts = await prisma.post.findMany({
            include: {
                author: {
                    select: {
                        name: true,
                    }
                },
                comments: {
                    select: {
                        content: true,
                        author: {
                            select: {
                                name: true,
                            }
                        },
                        createdAt: true
                    }
                }
            },
        })
        res.status(200).json(posts)
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
    }
    res.status(405).end()
})