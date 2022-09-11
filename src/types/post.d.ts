export default interface Post {
    id: string
    authorId: string
    content: string
    createdAt: string
    author: {
        name: string
    }
    comments: Comment[]
    likes: number
}

interface Comment {
    id: string
    postId: string
    authorId: string
    content: string
    createdAt: string
    author: {
        name: string
    }
}