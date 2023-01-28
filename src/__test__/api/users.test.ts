import {createMocks} from 'node-mocks-http'
import {usersHandlerFunc} from '../../pages/api/users/'
import {createMockUser, sessionUserToUser} from '../helpers'
import {userHandlerFunc} from '../../pages/api/users/[userId]'
import {createPost} from '../../server/db/post'
import {userPostHandlerFunc} from '../../pages/api/users/[userId]/posts'
import {userAddHandlerFunc} from '../../pages/api/users/[userId]/add'
import {createFriendship} from '../../server/db/friendship'
import Post from '../../types/post'

beforeAll(() => {
	process.env.DATABASE_URL = process.env.DATABASE_URL_TEST
})

describe('GET /api/user', () => {
	it('should return list of other users with 200 response code', async () => {
		// Create fake user
		const mockUser = sessionUserToUser(await createMockUser(), 0, 0)
		// Create fake HTTP request
		const {req, res} = createMocks({method: 'GET'})
		// Call handler function
		await usersHandlerFunc(req, res, mockUser)
		// Check response
		expect(res._getStatusCode()).toBe(200)
		expect(res._getJSONData()).not.toContainEqual(mockUser)
	})
})

describe('GET /api/users/:id', () => {
	it('should return user object if user exists', async () => {
		// Create fake user
		const mockUser = await createMockUser()
		// Create fake HTTP request
		const {req, res} = createMocks({method: 'GET', query: {userId: mockUser.id}})
		// Call handler function
		await userHandlerFunc(req, res)
		// Check response
		expect(res._getStatusCode()).toBe(200)
		expect(res._getJSONData()).toEqual(mockUser)
	})
	it('should return 404 if user does not exist', async () => {
		// Create fake HTTP request
		const {req, res} = createMocks({method: 'GET', query: {userId: 'invalid-id'}})
		// Call handler function
		await userHandlerFunc(req, res)
		// Check response
		expect(res._getStatusCode()).toBe(404)
	})
})

describe('POST /api/users/:id/posts', () => {
	it('should return list of posts if user exists', async () => {
		const postContent = 'test post content'
		// Create fake user
		const mockUser = await createMockUser()
		// Create post for fake user
		await createPost(mockUser, postContent)
		// Create fake HTTP request
		const {req, res} = createMocks({method: 'GET', query: {userId: mockUser.id}})
		// Call handler function
		await userPostHandlerFunc(req, res)
		// Check response
		expect(res._getStatusCode()).toBe(200)
		expect(res._getJSONData().length).toBeGreaterThan(0)
		expect(res._getJSONData().find((post: Post) => post.content === postContent)).toBeTruthy()
	})
	it('should return empty list if user does not exist', async () => {
		// Create fake HTTP request
		const {req, res} = createMocks({method: 'GET', query: {userId: 'invalid-id'}})
		// Call handler function
		await userPostHandlerFunc(req, res)
		// Check response
		expect(res._getStatusCode()).toBe(200)
		expect(res._getJSONData().length).toBe(0)
	})
})

describe('POST /api/users/:id/add', () => {
	// should return 200 if id are valid and user is not already friends
	it('should redirect to /users if id are valid and user is not already friends', async () => {
		// Create fake user
		const mockUser = await createMockUser()
		const mockFriend = await createMockUser()
		// Create fake HTTP request
		const {req, res} = createMocks({method: 'POST', query: {userId: mockFriend.id}})
		// Call handler function
		await userAddHandlerFunc(req, res, mockUser)
		// Check response
		expect(res._getStatusCode()).toBe(302)
		expect(res._getRedirectUrl()).toBe('/users')
	})
	// should return 400 if userId === friendId
	it('should return 400 if userId === friendId', async () => {
		// Create fake user
		const mockUser = await createMockUser()
		// Create fake HTTP request
		const {req, res} = createMocks({method: 'POST', query: {userId: mockUser.id}})
		// Call handler function
		await userAddHandlerFunc(req, res, mockUser)
		// Check response
		expect(res._getStatusCode()).toBe(400)
	})
	// should return 400 if id are valid and user is already friends
	it('should return 400 if id are valid and user is already friends', async () => {
		// Create fake user
		const mockUser = await createMockUser()
		const mockFriend = await createMockUser()
		// Create friendship
		await createFriendship(mockUser.id, mockFriend.id)
		// Create fake HTTP request
		const {req, res} = createMocks({method: 'POST', query: {userId: mockFriend.id}})
		// Call handler function
		await userAddHandlerFunc(req, res, mockUser)
		// Check response
		expect(res._getStatusCode()).toBe(400)
	})
	it('should return 404 if friendId is invalid', async () => {
		// Create fake user
		const mockUser = await createMockUser()
		// Create fake HTTP request
		const {req, res} = createMocks({method: 'POST', query: {userId: 'invalid-id'}})
		// Call handler function
		await userAddHandlerFunc(req, res, mockUser)
		// Check response
		expect(res._getStatusCode()).toBe(404)
		expect(res._getJSONData()).toEqual({message: 'User not found'})
	})
})