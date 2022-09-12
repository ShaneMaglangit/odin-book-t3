export default interface Comment {
    id: string
    postId: string
    authorId: string
    content: string
    createdAt: string
    author: {
        name: string
        image: string
    }
}