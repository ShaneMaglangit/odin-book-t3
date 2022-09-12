import requireAuthorization from '../../../../../server/common/requireAuthorization'
import {NextApiRequest, NextApiResponse} from 'next'
import {getPendingFriendship} from '../../../../../server/db/friendship'

export default requireAuthorization(async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') res.status(405).end()
    const userId = req.query.userId as string
    const requests = await getPendingFriendship(userId)
    res.status(200).json(requests)
    return
})