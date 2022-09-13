import requireAuthorization from '../../../../server/common/requireAuthorization'
import {NextApiRequest, NextApiResponse} from 'next'
import {getUserById} from '../../../../server/db/user'

export const userHandlerFunc = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') return res.status(405).end()
    const userId = req.query.userId as string
    const user = await getUserById(userId)
    if (!user) return res.status(404).end()
    res.status(200).json(user)
}

export default requireAuthorization(userHandlerFunc)