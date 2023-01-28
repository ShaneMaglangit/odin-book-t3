import Post from '../../types/post'
import Image from 'next/image'
import React from 'react'

const PostDetail = ({post}: { post: Post }) => (
	<div className="flex gap-x-4 items-center mt-4">
		<div className="flex items-center gap-x-2">
			<Image className="rounded-full bg-gray-500" src={post.author.image} alt="" width={24} height={24}/>
			<span className="text-gray-400 text-sm">{post.author.name}</span>
		</div>
		<span className="text-gray-400 text-sm flex-1 text-right">{new Date(post.createdAt).toDateString()}</span>
		<span className="text-gray-400 text-sm">{post.likes} Likes</span>
	</div>
)

export default PostDetail