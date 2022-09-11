import type {NextPage} from 'next'
import Head from 'next/head'
import requireAuthentication from '../server/common/requireAuthentication'
import Navbar from '../components/navbar'
import PostBox from '../components/postbox'
import PostFeed from '../components/postfeed'

const Index: NextPage = () => {
    return (
        <>
            <Head>
                <title>Odin Project T3</title>
                <meta name="description"
                      content="Based on the Odin Project built with typesafe libraries and frameworks"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar/>
            <main className="bg-gray-600 min-h-screen">
                <div
                    className=" container mx-auto max-w-7xl flex flex-col items-center justify-start min-h-screen py-4 px-8">
                    <PostBox/>
                    <PostFeed/>
                </div>
            </main>
        </>
    )
}

export const getServerSideProps = requireAuthentication()

export default Index
