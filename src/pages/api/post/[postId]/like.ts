import requireAuthorization from '../../../../server/common/requireAuthorization'
import {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from '../../../../server/db/client'
import {likePost} from '../../../../server/db/post'

export default requireAuthorization(async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'PUT') return res.status(405).end()
    const postId = req.query.postId as string
    await likePost(postId)
    res.status(200).redirect('/')
})