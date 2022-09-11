import Post from '../types/post'
import {useQuery} from 'react-query'
import Image from 'next/image'

const PostFeed = () => {
    const {data: posts, refetch} = useQuery<Post[]>('posts', () => fetch('/api/post').then(res => res.json()))

    const likePost = (postId: string) => fetch(`/api/post/${postId}/like`, {method: 'PUT'}).then(() => refetch())

    return (
        <div className="w-full">
            {posts?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(post =>
                <div key={post.id} className="w-full mb-4">
                    <div
                        className={`${post.comments.length === 0 && 'rounded-b-lg'} w-full block p-6 bg-white rounded-t-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700`}>
                        <p className="text-white">{post.content}</p>
                        <div className="flex gap-x-4 items-center mt-4">
                            <div className="flex items-center gap-x-2">
                                <Image className="rounded-full bg-gray-500" src={post.author.image} alt="" width={24}
                                       height={24}/>
                                <span className="text-gray-400 text-sm">{post.author.name}</span>
                            </div>
                            <span
                                className="text-gray-400 text-sm flex-1 text-right">{new Date(post.createdAt).toDateString()}</span>
                            <span className="text-gray-400 text-sm">{post.likes} Likes</span>
                        </div>
                        <form className="flex gap-x-4 items-center mt-4" method="POST"
                              action={`/api/post/${post.id}/comment`}>
                            <input id="content" name="content" required={true}
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
                    {post.comments.length > 0 && (
                        <div className="w-full bg-gray-700 p-4 gap-y-2 flex flex-col">
                            {post.comments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(comment =>
                                <div key={comment.id} className="w-full">
                                    <p className="text-gray-300 text-sm">
                                        <b>{comment.author.name}:</b> {comment.content}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default PostFeed