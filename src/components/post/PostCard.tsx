import Post from '../../types/post'
import React from 'react'
import CommentInput from '../comment/CommentInput'
import CommentCard from '../comment/CommentCard'
import PostDetail from "./PostDetail";

interface Props {
	post: Post,
	likeCallback: (postId: string) => void
}

const PostCard = ({post, likeCallback, ...props}: Props & React.HTMLProps<HTMLDivElement>) => (
	<div {...props} className="w-full mb-4">
		<div
			className={`${post.comments.length === 0 && 'rounded-b-lg'} w-full block p-6 bg-white rounded-t-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700`}>
			<p className="text-white">{post.content}</p>
			<PostDetail post={post}/>
			<CommentInput postId={post.id} likeCallback={likeCallback}/>
		</div>
		{post.comments.length > 0 && <CommentCard comments={post.comments}/>}
	</div>
)

export default PostCard