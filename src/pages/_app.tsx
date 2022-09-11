import '../styles/globals.css'
import type {AppType} from 'next/dist/shared/lib/utils'
import {SessionProvider} from 'next-auth/react'
import {QueryClientProvider, QueryClient} from 'react-query'

const queryClient = new QueryClient()

const MyApp: AppType = ({Component, pageProps: {session, ...pageProps}}) => {
    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </SessionProvider>
    )
}

export default MyApp
