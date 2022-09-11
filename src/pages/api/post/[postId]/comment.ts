import {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from '../../../../server/db/client'
import requireAuthorization from '../../../../server/common/requireAuthorization'
import {SessionUser} from '../../../../types/session-user'

export default requireAuthorization(async (req: NextApiRequest, res: NextApiResponse, sessionUser: SessionUser) => {
    if (req.method !== 'POST') return res.status(405).end()
    const postId = req.query.postId as string
    const {content} = req.body as { content: string }
    await prisma.comment.create({
        data: {
            authorId: sessionUser.id,
            postId: postId,
            content: content,
        },
    })
    res.status(200).redirect('/')
})