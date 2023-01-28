import requireAuthorization from '../../../../server/common/requireAuthorization'
import {NextApiRequest, NextApiResponse} from 'next'
import {getPostById, likePost} from '../../../../server/db/post'

export const likeHandlerFunc = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'PUT') return res.status(405).end()
	const postId = req.query.postId as string
	const post = await getPostById(postId)
	if (!post) return res.status(400).end()
	await likePost(postId)
	res.redirect('/')
}

export default requireAuthorization(likeHandlerFunc)