import {prisma} from './client'

export async function createComment(userId: string, postId: string, content: string) {
	return prisma.comment.create({
		data: {
			authorId: userId,
			postId: postId,
			content: content,
		}
	})
}