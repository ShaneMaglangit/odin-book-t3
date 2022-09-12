import {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from '../../../server/db/client'
import requireAuthorization from '../../../server/common/requireAuthorization'
import {SessionUser} from '../../../types/session-user'
import {createPost, getFriendIds, getPostsByUserAndFriends} from '../../../server/db/post'

export default requireAuthorization(async (req: NextApiRequest, res: NextApiResponse, sessionUser: SessionUser) => {
    // Get list of posts
    if (req.method === 'GET') {
        // Get list of user friend's IDs
        const friendIds = await getFriendIds(sessionUser)
        // Get posts belonging to the user or their friends
        const posts = await getPostsByUserAndFriends(sessionUser, friendIds)
        res.status(200).json(posts)
        return
    }
    // Create a new post
    if (req.method === 'POST') {
        const {content} = req.body as { content: string }
        await createPost(sessionUser, content)
        res.status(200).redirect('/')
        return
    }
    // Invalid method
    res.status(405).end()
})

