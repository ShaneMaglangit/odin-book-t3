import requireAuthorization from '../../../server/common/requireAuthorization'
import {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from '../../../server/db/client'
import {Session} from 'next-auth'

export default requireAuthorization(async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    if (req.method !== 'GET') return res.status(405).end()
    const users = await prisma.user.findMany({
        where: {
            id: {not: session!.user!.id},
        },
        select: {
            _count: {
                select: {
                    primaryFriendships: {
                        where: {
                            friendId: {
                                equals: session!.user!.id,
                            }
                        },
                    },
                    secondaryFriendships: {
                        where: {
                            userId: {
                                equals: session!.user!.id,
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