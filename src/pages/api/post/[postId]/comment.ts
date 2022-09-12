import {NextApiRequest, NextApiResponse} from 'next'
import requireAuthorization from '../../../../server/common/requireAuthorization'
import {SessionUser} from '../../../../types/session-user'
import {createComment} from '../../../../server/db/comment'

export default requireAuthorization(async (req: NextApiRequest, res: NextApiResponse, sessionUser: SessionUser) => {
    if (req.method !== 'POST') return res.status(405).end()
    const postId = req.query.postId as string
    const {content} = req.body as { content: string }
    await createComment(sessionUser.id, postId, content)
    res.status(200).redirect('/')
})