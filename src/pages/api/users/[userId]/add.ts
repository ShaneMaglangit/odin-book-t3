import requireAuthorization from '../../../../server/common/requireAuthorization'
import {NextApiRequest, NextApiResponse} from 'next'
import {SessionUser} from '../../../../types/session-user'
import {createFriendship, getFriendshipByUserIdAndFriendId} from '../../../../server/db/friendship'
import {getUserById} from '../../../../server/db/user'

export const userAddHandlerFunc = async (req: NextApiRequest, res: NextApiResponse, sessionUser: SessionUser) => {
	if (req.method !== 'POST') return res.status(405).end()
	const friendId = req.query.userId as string
	if (friendId === sessionUser.id) return res.status(400).end()
	const friend = await getUserById(friendId)
	if (!friend) return res.status(404).json({message: 'User not found'})
	const existingRequest = await getFriendshipByUserIdAndFriendId(sessionUser.id, friendId)
	if (existingRequest !== null) return res.status(400).json({message: 'Friend request already exists'})
	await createFriendship(sessionUser.id, friendId)
	res.redirect('/users')
}

export default requireAuthorization(userAddHandlerFunc)