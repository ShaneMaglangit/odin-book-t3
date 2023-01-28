import {SessionUser} from './session-user'

export default interface User extends SessionUser {
	id: string
	name: string
	image: string
	email: string
	_count: {
		primaryFriendships: number
		secondaryFriendships: number
	}
}