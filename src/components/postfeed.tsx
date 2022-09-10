import {useEffect, useState} from 'react'

interface Post {
    id: string
    authorId: string
    message: string
    createdAt: string
    author: {
        name: string
    }
}

const PostFeed = () => {
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        fetch('/api/post').then(res => res.json()).then(setPosts)
    }, [])

    return (

        <div className="w-full">
            {posts.map(post =>
                <div key={post.id}
                     className="mb-4 w-full block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <p className="text-white">{post.message}</p>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-gray-400 text-sm">{post.author.name}</span>
                        <span className="text-gray-400 text-sm">{new Date(post.createdAt).toUTCString()}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PostFeed