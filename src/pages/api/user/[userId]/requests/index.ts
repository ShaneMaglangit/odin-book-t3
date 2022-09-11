import requireAuthorization from '../../../../../server/common/requireAuthorization'
import {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from '../../../../../server/db/client'

export default requireAuthorization(async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') res.status(405).end()
    const userId = req.query.userId as string
    const requests = await prisma.friendship.findMany({
        where: {friendId: userId, pending: true},
        include: {
            friend: {
                select: {
                    id: true,
                    name: true,
                    image: true
                }
            }
        }
    })
    console.log(requests)
    res.status(200).json(requests)
    return
})