import type {NextPage} from 'next'
import Head from 'next/head'
import requireAuthentication from '../server/common/requireAuthentication'
import Navbar from '../components/common/Navbar'
import Main from '../components/common/Main'
import PostBox from '../components/post/PostBox'
import PostFeed from '../components/feed/Feed'

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
			<Main>
				<PostBox/>
				<PostFeed/>
			</Main>
		</>
	)
}

export const getServerSideProps = requireAuthentication()

export default Index
