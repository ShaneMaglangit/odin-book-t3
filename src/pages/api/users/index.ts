import requireAuthorization from '../../../server/common/requireAuthorization'
import {NextApiRequest, NextApiResponse} from 'next'
import {SessionUser} from '../../../types/session-user'
import {getUsersExcludeCurrentById} from '../../../server/db/user'

export const usersHandlerFunc = async (req: NextApiRequest, res: NextApiResponse, sessionUser: SessionUser) => {
    if (req.method !== 'GET') return res.status(405).end()
    const users = await getUsersExcludeCurrentById(sessionUser.id)
    res.status(200).json(users)
}

export default requireAuthorization(usersHandlerFunc)