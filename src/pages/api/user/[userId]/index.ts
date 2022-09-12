import requireAuthorization from '../../../../server/common/requireAuthorization'
import {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from '../../../../server/db/client'
import {getUserById} from '../../../../server/db/user'

export default requireAuthorization(async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') return res.status(405).end()
    const userId = req.query.userId as string
    const user = await getUserById(userId)
    res.status(200).json(user)
})