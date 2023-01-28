import {createMockUser} from '../helpers'
import {acceptFriendshipById, createFriendship, getFriendshipById} from '../../server/db/friendship'
import {createMocks} from 'node-mocks-http'
import {requestsHandlerFunc} from '../../pages/api/requests'
import {requestIdHandlerFunc} from '../../pages/api/requests/[requestId]'
import {Friendship} from '../../types/friendship'

describe('GET /api/requests', () => {
	it('should return list of friend requests if user exists', async () => {
		// Create fake user
		const mockUser = await createMockUser()
		const mockFriend = await createMockUser()
		// Create friendship
		await createFriendship(mockFriend.id, mockUser.id)
		// Create fake HTTP request
		const {req, res} = createMocks({method: 'GET'})
		// Call handler function
		await requestsHandlerFunc(req, res, mockUser)
		// Check response
		expect(res._getStatusCode()).toBe(200)
		expect(res._getJSONData().find((friendship: Friendship) =>
			friendship.userId === mockFriend.id && friendship.friendId === mockUser.id
		)).toBeTruthy()
	})
	it('should not return accepted friend requests', async () => {
		// Create fake user
		const mockUser = await createMockUser()
		const mockFriend = await createMockUser()
		// Create friendship
		const friendship = await createFriendship(mockFriend.id, mockUser.id)
		// Accept friendship
		await acceptFriendshipById(friendship.id)
		// Create fake HTTP request
		const {req, res} = createMocks({method: 'GET', query: {userId: mockUser.id}})
		// Call handler function
		await requestsHandlerFunc(req, res, mockUser)
		// Check response
		expect(res._getStatusCode()).toBe(200)
		expect(res._getJSONData().find((friendship: Friendship) =>
			friendship.userId === mockFriend.id && friendship.friendId === mockUser.id
		)).toBeFalsy()
	})
})

describe('POST /api/requests/:id', () => {
	it('should update friendship if friendship exists and accepted', async () => {
		// Create fake user
		const mockUser = await createMockUser()
		const mockFriend = await createMockUser()
		// Create friendship
		const friendship = await createFriendship(mockFriend.id, mockUser.id)
		// Create fake HTTP request
		const {req, res} = createMocks({method: 'POST', query: {requestId: friendship.id, accept: 'true'}})
		// Call handler function
		await requestIdHandlerFunc(req, res, mockUser)
		// Check response
		expect(res._getStatusCode()).toBe(200)
		// Check if friendship is accepted
		const updatedFriendship = await getFriendshipById(friendship.id)
		expect(updatedFriendship?.pending).toBe(false)
	})
	it('should delete friendship if friendship exists and not accepted', async () => {
		// Create fake user
		const mockUser = await createMockUser()
		const mockFriend = await createMockUser()
		// Create friendship
		const friendship = await createFriendship(mockFriend.id, mockUser.id)
		// Create fake HTTP request
		const {req, res} = createMocks({method: 'POST', query: {requestId: friendship.id, accept: 'false'}})
		// Call handler function
		await requestIdHandlerFunc(req, res, mockUser)
		// Check response
		expect(res._getStatusCode()).toBe(200)
		// Check if friendship is deleted
		const updatedFriendship = await getFriendshipById(friendship.id)
		expect(updatedFriendship).toBeFalsy()
	})
	it('should return 400 if accept is not boolean', async () => {
		// Create fake user
		const mockUser = await createMockUser()
		const mockFriend = await createMockUser()
		// Create friendship
		const friendship = await createFriendship(mockFriend.id, mockUser.id)
		// Create fake HTTP request
		const {req, res} = createMocks({method: 'POST', query: {requestId: friendship.id, accept: 'invalid'}})
		// Call handler function
		await requestIdHandlerFunc(req, res, mockUser)
		// Check response
		expect(res._getStatusCode()).toBe(400)
	})
	it('should return 400 if friendship is not pending', async () => {
		// Create fake user
		const mockUser = await createMockUser()
		const mockFriend = await createMockUser()
		// Create friendship
		const friendship = await createFriendship(mockFriend.id, mockUser.id)
		// Accept friendship
		await acceptFriendshipById(friendship.id)
		// Create fake HTTP request
		const {req, res} = createMocks({method: 'POST', query: {requestId: friendship.id, accept: 'true'}})
		// Call handler function
		await requestIdHandlerFunc(req, res, mockUser)
		// Check response
		expect(res._getStatusCode()).toBe(400)
	})
	it('should return 404 if friendship does not exist', async () => {
		// Create fake user
		const mockUser = await createMockUser()
		// Create fake HTTP request
		const {req, res} = createMocks({method: 'POST', query: {requestId: 'invalid-id', accept: 'true'}})
		// Call handler function
		await requestIdHandlerFunc(req, res, mockUser)
		// Check response
		expect(res._getStatusCode()).toBe(404)
	})
	it('should return 403 if friendship exists but user is the sender', async () => {
		// Create fake user
		const mockUser = await createMockUser()
		const mockFriend = await createMockUser()
		// Create friendship
		const friendship = await createFriendship(mockUser.id, mockFriend.id)
		// Create fake HTTP request
		const {req, res} = createMocks({method: 'POST', query: {requestId: friendship.id, accept: 'true'}})
		// Call handler function
		await requestIdHandlerFunc(req, res, mockUser)
		// Check response
		expect(res._getStatusCode()).toBe(403)
	})
	it('should return 403 if friendship exists but not for user', async () => {
		// Create fake user
		const mockUser = await createMockUser()
		const mockFriend = await createMockUser()
		const mockFriend2 = await createMockUser()
		// Create friendship
		const friendship = await createFriendship(mockFriend.id, mockFriend2.id)
		// Create fake HTTP request
		const {req, res} = createMocks({method: 'POST', query: {requestId: friendship.id, accept: 'true'}})
		// Call handler function
		await requestIdHandlerFunc(req, res, mockUser)
		// Check response
		expect(res._getStatusCode()).toBe(403)
	})
})