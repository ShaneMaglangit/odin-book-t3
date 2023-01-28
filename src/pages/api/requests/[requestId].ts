import requireAuthorization from '../../../server/common/requireAuthorization'
import {NextApiRequest, NextApiResponse} from 'next'
import {acceptFriendshipById, getFriendshipById, rejectFriendshipById} from '../../../server/db/friendship'
import {SessionUser} from '../../../types/sessionUser'

export const requestIdHandlerFunc = async (req: NextApiRequest, res: NextApiResponse, sessionUser: SessionUser) => {
	if (req.method !== 'PUT') res.status(405).end()
	const requestId = req.query.requestId as string
	const isAccept = req.query.accept as string
	if (isAccept !== 'true' && isAccept !== 'false') res.status(400).json({message: 'accept must be true or false'})
	const friendship = await getFriendshipById(requestId)
	if (friendship === null) return res.status(404).json({message: 'request not found'})
	if (!friendship.pending) return res.status(400).json({message: 'request is already accepted'})
	if (friendship.friendId !== sessionUser.id) {
		if (friendship.userId !== sessionUser.id)
			return res.status(403).json({message: 'you are not allowed to reject this request'})
		return res.status(403).json({message: 'you are not allowed to accept this request'})
	}
	if (isAccept === 'true') {
		await acceptFriendshipById(requestId)
		return res.status(200).json({message: 'friend request accepted'})
	}
	if (isAccept === 'false') {
		await rejectFriendshipById(requestId)
		return res.status(200).json({message: 'friend request declined'})
	}
}

export default requireAuthorization(requestIdHandlerFunc)