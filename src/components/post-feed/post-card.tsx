import Post from '../../types/post'
import React from 'react'
import PostDetails from './post-details'
import ResponseField from './response-field'
import CommentList from './comment-list'

interface Props {
    post: Post,
    likeCallback: (postId: string) => void
}

const PostCard = ({post, likeCallback, ...props}: Props & React.HTMLProps<HTMLDivElement>) => (
    <div {...props} className="w-full mb-4">
        <div
            className={`${post.comments.length === 0 && 'rounded-b-lg'} w-full block p-6 bg-white rounded-t-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700`}>
            <p className="text-white">{post.content}</p>
            <PostDetails post={post}/>
            <ResponseField postId={post.id} likeCallback={likeCallback}/>
        </div>
        {post.comments.length > 0 && <CommentList comments={post.comments}/>}
    </div>
)

export default PostCard