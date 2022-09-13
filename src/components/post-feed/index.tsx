import Post from '../../types/post'
import {useQuery} from 'react-query'
import React from 'react'
import PostCard from './post-card'

const PostFeed = ({userId}: { userId?: string }) => {
    // Fetch posts from the database
    const {data: posts, refetch} = useQuery<Post[]>('posts', () => (
        fetch(userId !== undefined ? `/api/users/${userId}/posts` : '/api/post')
    ).then(res => res.json()))

    // Callback function for liking a post
    const likePost = (postId: string) => fetch(`/api/post/${postId}/like`, {method: 'PUT'}).then(() => refetch())

    return (
        <div className="w-full">
            {posts?.map(post => <PostCard key={post.id} post={post} likeCallback={likePost}/>)}
        </div>
    )
}

export default PostFeed