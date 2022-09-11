import Post from '../types/post'
import {useQuery} from 'react-query'

const PostFeed = () => {
    const {data: posts, refetch} = useQuery<Post[]>('posts', () => fetch('/api/post').then(res => res.json()))

    const likePost = (postId: string) => fetch(`/api/post/${postId}/like`, {method: 'PUT'}).then(() => refetch())

    return (
        <div className="w-full">
            {posts?.map(post =>
                <div key={post.id}
                     className="mb-4 w-full block p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <p className="text-white">{post.content}</p>
                    <div className="flex gap-x-4 items-center mt-4">
                        <span className="text-gray-400 text-sm">By {post.author.name}</span>
                        <span
                            className="text-gray-400 text-sm flex-1 text-right">{new Date(post.createdAt).toDateString()}</span>
                        <span className="text-gray-400 text-sm">Likes {post.likes}</span>
                    </div>
                    <form className="flex gap-x-4 items-center mt-4">
                        <input id="comment" name="comment" required={true}
                               className="flex-1 py-1.5 px-2 bg-none border-2 border-gray-500 text-white rounded-lg bg-gray-800 focus:outline-none"/>
                        <button
                            className="inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                            Comment
                        </button>
                        <button type="button" onClick={() => likePost(post.id)}
                                className="inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                            Like
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default PostFeed