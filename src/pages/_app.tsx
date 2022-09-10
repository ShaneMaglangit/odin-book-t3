import '../styles/globals.css'
import type {AppType} from 'next/dist/shared/lib/utils'
import {SessionProvider} from 'next-auth/react'
import {getServerAuthSession} from '../server/common/getServerAuthSession'
import {GetServerSidePropsContext} from 'next'

const MyApp: AppType = ({
    Component,
    pageProps: {session, ...pageProps},
}) => {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    )
}

export default MyApp
