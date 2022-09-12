import {NextApiRequest, NextApiResponse} from 'next'
import {getServerAuthSession} from './getServerAuthSession'
import {SessionUser} from '../../types/session-user'

const fakeSessionUser: SessionUser = {
    id: 'fake-uuid',
    email: 'fake-email@domain.com',
    name: 'fake-name',
    image: 'fake-image-url',
}

export default function requireAuthorization(handler: (req: NextApiRequest, res: NextApiResponse, sessionUser: SessionUser) => void) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        // Return a fake session user if the request is from Jest
        if (process.env.JEST_WORKER_ID !== undefined) return handler(req, res, fakeSessionUser)
        // Otherwise, proceed with the real session user
        const session = await getServerAuthSession({req, res})
        if (session !== null) return handler(req, res, session.user as SessionUser)
        res.status(401)
        res.end()
    }
}
