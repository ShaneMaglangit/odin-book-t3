import requireAuthorization from '../../../../../server/common/requireAuthorization'
import {NextApiRequest, NextApiResponse} from 'next'
import {acceptFriendshipById, rejectFriendshipById} from '../../../../../server/db/friendship'

export default requireAuthorization(async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'PUT') res.status(405).end()
    const requestId = req.query.requestId as string
    const isAccept = req.query.accept as string === 'true'
    if (isAccept) {
        await acceptFriendshipById(requestId)
        res.status(200).json({message: 'Friend request accepted'})
        return
    }
    await rejectFriendshipById(requestId)
    res.status(200).json({message: 'Friend request declined'})
    return
})