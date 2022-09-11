import requireAuthorization from '../../../../server/common/requireAuthorization'
import {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from '../../../../server/db/client'

export default requireAuthorization(async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'PUT') return res.status(405).end()
    const postId = req.query.postId as string
    await prisma.post.update({
        where: {
            id: postId,
        },
        data: {
            likes: {
                increment: 1,
            }
        }
    })
    res.status(200).redirect('/')
})