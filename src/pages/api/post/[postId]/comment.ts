import {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from '../../../../server/db/client'
import {Session} from 'next-auth'
import requireAuthorization from '../../../../server/common/requireAuthorization'

export default requireAuthorization(async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    if (req.method !== 'POST') return res.status(405).end()
    const postId = req.query.postId as string
    const {content} = req.body as { content: string }
    await prisma.comment.create({
        data: {
            authorId: session!.user!.id,
            postId: postId,
            content: content,
        },
    })
    res.status(200).redirect('/')
})