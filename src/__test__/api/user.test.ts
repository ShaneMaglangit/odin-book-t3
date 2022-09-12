import {createMocks} from 'node-mocks-http'
import userHandler from '../../pages/api/user'

describe('GET /api/user', () => {
    it('should return 200', async () => {
        const {req, res} = createMocks({method: 'GET'})
        await userHandler(req, res)
        expect(res._getStatusCode()).toBe(200)
        expect(res._getJSONData()).not.toBeNull()
    })
})