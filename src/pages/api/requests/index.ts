import requireAuthorization from '../../../server/common/requireAuthorization'
import {NextApiRequest, NextApiResponse} from 'next'
import {getPendingFriendship} from '../../../server/db/friendship'
import {SessionUser} from '../../../types/session-user'

export const requestsHandlerFunc = async (req: NextApiRequest, res: NextApiResponse, sessionUser: SessionUser) => {
	if (req.method !== 'GET') res.status(405).end()
	const requests = await getPendingFriendship(sessionUser.id)
	res.status(200).json(requests)
}

export default requireAuthorization(requestsHandlerFunc)