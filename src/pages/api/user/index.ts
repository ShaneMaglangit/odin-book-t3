import requireAuthorization from '../../../server/common/requireAuthorization'
import {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from '../../../server/db/client'
import {SessionUser} from '../../../types/session-user'

export default requireAuthorization(async (req: NextApiRequest, res: NextApiResponse, sessionUser: SessionUser) => {
    if (req.method !== 'GET') return res.status(405).end()
    const users = await prisma.user.findMany({
        where: {
            id: {not: sessionUser.id},
        },
        select: {
            _count: {
                select: {
                    primaryFriendships: {
                        where: {
                            friendId: {
                                equals: sessionUser.id,
                            }
                        },
                    },
                    secondaryFriendships: {
                        where: {
                            userId: {
                                equals: sessionUser.id,
                            }
                        },
                    },
                }
            },
            id: true,
            name: true,
            image: true,
        }
    })
    res.status(200).json(users)
})