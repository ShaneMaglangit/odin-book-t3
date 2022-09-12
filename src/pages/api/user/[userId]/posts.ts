import requireAuthorization from '../../../../server/common/requireAuthorization'
import {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from '../../../../server/db/client'
import {getPostsByUserId} from '../../../../server/db/post'

export default requireAuthorization(async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') return res.status(405).end()
    const userId = req.query.userId as string
    const posts = await getPostsByUserId(userId)
    res.status(200).json(posts)
})