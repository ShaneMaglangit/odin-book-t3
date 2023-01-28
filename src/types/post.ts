import Comment from './comment'

export default interface Post {
	id: string
	authorId: string
	content: string
	createdAt: string
	author: {
		name: string
		image: string
	}
	comments: Comment[]
	likes: number
}