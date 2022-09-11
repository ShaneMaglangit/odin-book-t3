import requireAuthorization from '../../../../server/common/requireAuthorization'
import {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from '../../../../server/db/client'
import {SessionUser} from '../../../../types/session-user'

export default requireAuthorization(async (req: NextApiRequest, res: NextApiResponse, sessionUser: SessionUser) => {
    if (req.method !== 'POST') return res.status(405).end()
    const userId = req.query.userId as string
    const existingRequest = await prisma.friendship.findFirst({
        where: {
            OR: [
                {userId: sessionUser.id, friendId: userId},
                {userId: userId, friendId: sessionUser.id},
            ]
        }
    })
    if (existingRequest !== null) return res.status(400).json({message: 'Friend request already exists'})
    await prisma.friendship.create({
        data: {
            friendId: userId,
            userId: sessionUser.id,
        }
    })
    res.status(200).redirect('/users')
})