import {NextApiRequest, NextApiResponse} from 'next'
import {getServerAuthSession} from './getServerAuthSession'
import {SessionUser} from '../../types/sessionUser'

export default function requireAuthorization(handler: (req: NextApiRequest, res: NextApiResponse, sessionUser: SessionUser) => void) {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		const session = await getServerAuthSession({req, res})
		if (session !== null) return handler(req, res, session.user as SessionUser)
		res.status(401)
		res.end()
	}
}
