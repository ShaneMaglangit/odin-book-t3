import requireAuthorization from '../../../../../server/common/requireAuthorization'
import {NextApiRequest, NextApiResponse} from 'next'
import {Session} from 'next-auth'
import {prisma} from '../../../../../server/db/client'

export default requireAuthorization(async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    if (req.method !== 'PUT') res.status(405).end()
    const requestId = req.query.requestId as string
    const isAccept = req.query.accept as string === 'true'
    if (isAccept) {
        await prisma.friendship.update({
            where: {id: requestId},
            data: {pending: false}
        })
        res.status(200).json({message: 'Friend request accepted'})
        return
    }
    await prisma.friendship.delete({
        where: {id: requestId}
    })
    res.status(200).json({message: 'Friend request declined'})
    return
})