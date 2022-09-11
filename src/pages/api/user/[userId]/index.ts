import requireAuthorization from '../../../../server/common/requireAuthorization'
import {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from '../../../../server/db/client'

export default requireAuthorization(async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') return res.status(405).end()
    const userId = req.query.userId as string
    const user = await prisma.user.findFirst({
        where: {
            id: userId
        },
        select: {
            id: true,
            name: true,
            image: true,
            email: true,
        }
    })
    res.status(200).json(user)
})