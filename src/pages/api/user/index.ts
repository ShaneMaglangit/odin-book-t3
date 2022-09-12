import requireAuthorization from '../../../server/common/requireAuthorization'
import {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from '../../../server/db/client'
import {SessionUser} from '../../../types/session-user'

export default requireAuthorization(async (req: NextApiRequest, res: NextApiResponse, sessionUser: SessionUser) => {
    if (req.method !== 'GET') return res.status(405).end()
    const users = await getUsers(sessionUser)
    res.status(200).json(users)
})

async function getUsers(sessionUser: SessionUser) {
    return prisma.user.findMany({
        where: {id: {not: sessionUser.id}},
        select: {
            _count: {
                select: {
                    primaryFriendships: {where: {friendId: sessionUser.id}},
                    secondaryFriendships: {where: {userId: sessionUser.id}},
                }
            },
            id: true,
            name: true,
            image: true,
        }
    })
}