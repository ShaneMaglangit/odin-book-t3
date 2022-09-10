import {NextApiRequest, NextApiResponse} from 'next'
import {Session} from 'next-auth'
import {getServerAuthSession} from './getServerAuthSession'

export default function requireAuthorization(handler: (req: NextApiRequest, res: NextApiResponse, session: Session) => void) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const session = await getServerAuthSession({req, res})
        if (session !== null) return handler(req, res, session)
        res.status(401)
        res.end()
    }
}
