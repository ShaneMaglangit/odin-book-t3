import Comment from '../../types/comment'
import React from 'react'

const CommentList = ({comments}: { comments: Comment[] }) => (
	<div className="w-full bg-gray-700 p-4 gap-y-2 flex flex-col rounded-b-lg">
		{comments.map((comment: Comment) =>
			<div key={comment.id} className="w-full">
				<p className="text-gray-300 text-sm">
					<b>{comment.author.name}:</b> {comment.content}
				</p>
			</div>
		)}
	</div>
)

export default CommentList