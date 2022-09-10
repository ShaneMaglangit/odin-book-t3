// HOC for GetServerSideProps to require authentication on protected pages
import {getServerAuthSession} from './getServerAuthSession'
import {GetServerSideProps, GetServerSidePropsContext} from 'next'

export function requireAuthentication(getServerSideProps?: GetServerSideProps) {
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
        return {props: {session}}
    }
}