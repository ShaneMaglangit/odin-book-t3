import requireAuthorization from '../../../../server/common/requireAuthorization'
import {NextApiRequest, NextApiResponse} from 'next'
import {SessionUser} from '../../../../types/session-user'
import {createFriendship, getFriendshipByUserIdAndFriendId} from '../../../../server/db/friendship'

export default requireAuthorization(async (req: NextApiRequest, res: NextApiResponse, sessionUser: SessionUser) => {
    if (req.method !== 'POST') return res.status(405).end()
    const friendId = req.query.userId as string
    const existingRequest = await getFriendshipByUserIdAndFriendId(sessionUser.id, friendId)
    if (existingRequest !== null) return res.status(400).json({message: 'Friend request already exists'})
    await createFriendship(sessionUser.id, friendId)
    res.status(200).redirect('/users')
})