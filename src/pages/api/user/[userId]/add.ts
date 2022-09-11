import requireAuthorization from '../../../../server/common/requireAuthorization'
import {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from '../../../../server/db/client'
import {Session} from 'next-auth'

export default requireAuthorization(async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    if (req.method !== 'POST') return res.status(405).end()
    const userId = req.query.userId as string
    const existingRequest = await prisma.friendship.findFirst({
        where: {
            OR: [
                {userId: session!.user!.id, friendId: userId},
                {userId: userId, friendId: session!.user!.id},
            ]
        }
    })
    if (existingRequest !== null) return res.status(400).json({message: 'Friend request already exists'})
    await prisma.friendship.create({
        data: {
            friendId: userId,
            userId: session!.user!.id,
        }
    })
    res.status(200).redirect('/users')
})