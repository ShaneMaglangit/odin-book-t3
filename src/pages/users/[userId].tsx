import Head from 'next/head'
import Navbar from '../../components/common/navbar'
import Image from 'next/image'
import requireAuthentication from '../../server/common/requireAuthentication'
import {useRouter} from 'next/router'
import {useQuery} from 'react-query'
import User from '../../types/user'
import PostFeed from '../../components/post-feed'

const UserProfile = () => {
	const userId = useRouter().query.userId as string
	const {data: user} = useQuery<User>(`user-${userId}`, () => fetch(`/api/users/${userId}`).then(res => res.json()))

	return (
		<>
			<Head>
				<title>{user?.name ?? 'Loading'} | Odin Project T3</title>
				<meta name="description" content="Directory of users of the Odin Book Porject"/>
				<link rel="icon" href="/public/favicon.ico"/>
			</Head>
			<Navbar/>
			<main className="bg-gray-600 min-h-screen">
				<div
					className="container mx-auto max-w-7xl flex flex-col items-center justify-start min-h-screen py-4 px-8">
					<div
						className="w-full mb-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
						<div className="flex flex-col items-center py-10 px-10">
							{user?.image && (
								<div
									className="relative mb-3 h-24 w-24 overflow-hidden rounded-full shadow-lg bg-white">
									<Image layout="fill" src={user.image} alt={user.name ?? 'Loading'}/>
								</div>
							)}
							<h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user?.name ?? 'Loading'}</h5>
							<span
								className="text-sm text-gray-500 dark:text-gray-400">{user?.email ?? 'Loading'}</span>
						</div>
					</div>
					<h3 className="w-full mb-4 font-bold text-gray-200 text-lg">{user?.name ?? 'User'}&apos;s Posts</h3>
					<PostFeed userId={userId}/>
				</div>
			</main>
		</>
	)
}

export const getServerSideProps = requireAuthentication()

export default UserProfile