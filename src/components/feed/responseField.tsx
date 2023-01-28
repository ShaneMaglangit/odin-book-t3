import Button from '../common/button'
import React from 'react'

const ResponseField = ({postId, likeCallback}: { postId: string, likeCallback: (postId: string) => void }) => (
	<form className="flex gap-x-4 items-center mt-4" method="POST" action={`/api/post/${postId}/comment`}>
		<input id="content" name="content" required={true}
					 className="flex-1 py-1.5 px-2 bg-none border-2 border-gray-500 text-white rounded-lg bg-gray-800 focus:outline-none"/>
		<Button>Comment</Button>
		<Button type="button" onClick={() => likeCallback(postId)}>Like</Button>
	</form>
)

export default ResponseField