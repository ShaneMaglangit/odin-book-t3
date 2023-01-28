import {getServerAuthSession} from './getServerAuthSession'
import {GetServerSideProps, GetServerSidePropsContext} from 'next'

// HOC for GetServerSideProps to require authentication on protected pages
export default function requireAuthentication(getServerSideProps?: GetServerSideProps) {
	return async (context: GetServerSidePropsContext) => {
		const session = await getServerAuthSession(context)
		if (!session) {
			return {
				redirect: {
					destination: '/signin',
					permanent: false,
				}
			}
		}
		if (getServerSideProps) return await getServerSideProps(context)
		return {props: {user: session.user}}
	}
}