import {NextApiRequest, NextApiResponse} from 'next'
import {SessionUser} from '../../../../types/sessionUser'
import {createComment} from '../../../../server/db/comment'
import {getPostById} from '../../../../server/db/post'
import requireAuthorization from '../../../../server/common/requireAuthorization'

export const commentHandlerFunc = async (req: NextApiRequest, res: NextApiResponse, sessionUser: SessionUser) => {
	if (req.method !== 'POST') return res.status(405).end()
	const postId = req.query.postId as string
	const post = await getPostById(postId)
	if (!post) return res.status(400).end()
	const {content} = req.body as { content: string }
	if (!content) return res.status(400).end()
	await createComment(sessionUser.id, postId, content)
	res.redirect('/')
}

export default requireAuthorization(commentHandlerFunc)