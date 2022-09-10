// create post handler to add new post to the database
import {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from '../../server/db/client'
import {Session} from 'next-auth'
import requireAuthorization from '../../server/common/requireAuthorization'

const post = requireAuthorization(async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    if (req.method === 'GET') {
        const posts = await prisma.post.findMany({
            include: {
                author: {
                    select: {
                        name: true,
                    }
                }
            },
        })
        res.status(200).json(posts)
    }
    if (req.method === 'POST') {
        const {message} = req.body as { message: string }
        await prisma.post.create({
            data: {
                authorId: session!.user!.id,
                message: message,
            },
        })
        res.status(200).redirect('/')
    }
    res.status(405).end()
})

export default post