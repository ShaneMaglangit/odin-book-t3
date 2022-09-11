import requireAuthorization from '../../../../server/common/requireAuthorization'
import {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from '../../../../server/db/client'

export default requireAuthorization(async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') return res.status(405).end()
    const userId = req.query.userId as string
    const posts = await prisma.post.findMany({
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
                }
            }
        },
    })
    res.status(200).json(posts)
})