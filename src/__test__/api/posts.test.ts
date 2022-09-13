import {createMockUser, deleteMockUsers} from '../helpers'
import {createPost, getPostById} from '../../server/db/post'
import {postHandlerFunc} from '../../pages/api/post'
import {createMocks} from 'node-mocks-http'
import Post from '../../types/post'
import {acceptFriendshipById, createFriendship} from '../../server/db/friendship'
import {likeHandlerFunc} from '../../pages/api/post/[postId]/like'
import commentHandlerFunc from '../../pages/api/post/[postId]/comment'

describe('GET /api/posts', () => {
    it('should return list of posts where author is user', async () => {
        // Create fake user
        const mockUser = await createMockUser()
        // Create post for fake user
        const postContent = 'test post content'
        await createPost(mockUser, postContent)
        // Create fake HTTP request
        const {req, res} = createMocks({method: 'GET'})
        // Call handler function
        await postHandlerFunc(req, res, mockUser)
        // Check response
        expect(res._getStatusCode()).toBe(200)
        expect(res._getJSONData().length).toBeGreaterThan(0)
        expect(res._getJSONData().find((post: Post) => post.content === postContent)).toBeTruthy()
    })
    it('should return list of posts where author is friend of user', async () => {
        // Create fake user
        const mockUser = await createMockUser()
        const mockFriend = await createMockUser()
        // Create friendship
        const friendship = await createFriendship(mockUser.id, mockFriend.id)
        await acceptFriendshipById(friendship.id)
        // Create post for fake user
        const postContent = 'test post content'
        await createPost(mockFriend, postContent)
        // Create fake HTTP request
        const {req, res} = createMocks({method: 'GET'})
        // Call handler function
        await postHandlerFunc(req, res, mockUser)
        // Check response
        expect(res._getStatusCode()).toBe(200)
        expect(res._getJSONData().length).toBeGreaterThan(0)
        expect(res._getJSONData().find((post: Post) => post.content === postContent)).toBeTruthy()
    })
    it('should not return post where author is not from user/friend', async () => {
        // Create fake user
        const mockUser = await createMockUser()
        const mockStranger = await createMockUser()
        // Create post for fake user
        const postContent = 'test post content'
        await createPost(mockStranger, postContent)
        // Create fake HTTP request
        const {req, res} = createMocks({method: 'GET'})
        // Call handler function
        await postHandlerFunc(req, res, mockUser)
        // Check response
        expect(res._getStatusCode()).toBe(200)
        expect(res._getJSONData().find((post: Post) => post.content === postContent)).toBeFalsy()
    })
})

describe('POST /api/posts', () => {
    it('should return 302 and post must be added if content is not empty', async () => {
        // Create fake user
        const mockUser = await createMockUser()
        // Create fake HTTP request
        const {req, res} = createMocks({method: 'POST', body: {content: 'test content'}})
        // Call handler function
        await postHandlerFunc(req, res, mockUser)
        // Check response
        expect(res._getStatusCode()).toBe(302)
        expect(res._getRedirectUrl()).toBe('/')
    })
    it('should return 400 if content is empty', async () => {
        // Create fake user
        const mockUser = await createMockUser()
        // Create fake HTTP request
        const {req, res} = createMocks({method: 'POST', body: {content: ''}})
        // Call handler function
        await postHandlerFunc(req, res, mockUser)
        // Check response
        expect(res._getStatusCode()).toBe(400)
    })
})

describe('PUT /api/post/[postId]/like', () => {
    it('should return 302 and like count must increment', async () => {
        // Create fake user
        const mockUser = await createMockUser()
        // Create post for fake user
        const postContent = 'test post content'
        const post = await createPost(mockUser, postContent)
        // Create fake HTTP request
        const {req, res} = createMocks({method: 'PUT', query: {postId: post.id}})
        // Call handler function
        await likeHandlerFunc(req, res)
        // Check response
        expect(res._getStatusCode()).toBe(302)
        expect(res._getRedirectUrl()).toBe('/')
        // Check update post
        const updatedPost = await getPostById(post.id)
        expect(updatedPost?.likes ?? 0).toBe(1)
    })
    it('should return 400 if post not found', async () => {
        // Create fake HTTP request
        const {req, res} = createMocks({method: 'PUT', query: {postId: 'not-found'}})
        // Call handler function
        await likeHandlerFunc(req, res)
        // Check response
        expect(res._getStatusCode()).toBe(400)
    })
})

describe('POST /api/post/[postId]/comment', () => {
    it('should return 302 and comment must be added if content is not empty', async () => {
        // Create fake user
        const mockUser = await createMockUser()
        // Create post for fake user
        const postContent = 'test post content'
        const post = await createPost(mockUser, postContent)
        // Create fake HTTP request
        const {req, res} = createMocks({method: 'POST', query: {postId: post.id}, body: {content: 'test content'}})
        // Call handler function
        await commentHandlerFunc(req, res, mockUser)
        // Check response
        expect(res._getStatusCode()).toBe(302)
        expect(res._getRedirectUrl()).toBe('/')
    })
    it('should return 400 if content is empty', async () => {
        // Create fake user
        const mockUser = await createMockUser()
        // Create post for fake user
        const postContent = 'test post content'
        const post = await createPost(mockUser, postContent)
        // Create fake HTTP request
        const {req, res} = createMocks({method: 'POST', query: {postId: post.id}, body: {content: ''}})
        // Call handler function
        await commentHandlerFunc(req, res, mockUser)
        // Check response
        expect(res._getStatusCode()).toBe(400)
    })
    it('should return 400 if post not found', async () => {
        // Create fake user
        const mockUser = await createMockUser()
        // Create fake HTTP request
        const {req, res} = createMocks({method: 'POST', query: {postId: 'not-found'}, body: {content: 'test content'}})
        // Call handler function
        await commentHandlerFunc(req, res, mockUser)
        // Check response
        expect(res._getStatusCode()).toBe(400)
    })
})

afterAll(async () => {
    await deleteMockUsers()
})