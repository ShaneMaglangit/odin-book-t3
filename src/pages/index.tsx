import type {NextPage} from 'next'
import Head from 'next/head'
import requireAuthentication from '../server/common/requireAuthentication'
import Navbar from '../components/navbar'
import MainContent from '../components/main-content'
import PostBox from '../components/post-box'
import PostFeed from '../components/post-feed'

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
            <MainContent>
                <PostBox/>
                <PostFeed/>
            </MainContent>
        </>
    )
}

export const getServerSideProps = requireAuthentication()

export default Index
