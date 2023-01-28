import {NextPage} from 'next'
import Head from 'next/head'
import Navbar from '../../components/common/Navbar'
import requireAuthentication from '../../server/common/requireAuthentication'
import {useQuery} from 'react-query'
import User from '../../types/user'
import Image from 'next/image'


const Users: NextPage = () => {
	const {data: users, refetch} = useQuery<User[]>('users', () => fetch('/api/users').then(res => res.json()))

	const sendRequest = (userId: string) => {
		fetch(`/api/users/${userId}/add`, {method: 'POST'}).then(() => refetch())
	}

	return (
		<>
			<Head>
				<title>Users | Odin Project T3</title>
				<meta name="description" content="Directory of users of the Odin Book Porject"/>
				<link rel="icon" href="/public/favicon.ico"/>
			</Head>
			<Navbar/>
			<main className="bg-gray-600 min-h-screen">
				<div
					className="container mx-auto max-w-7xl flex flex-col items-center justify-start min-h-screen py-4 px-8">
					{users?.map(user => {
						const isFriend = user._count.primaryFriendships + user._count.secondaryFriendships === 1
						return (
							<div
								key={user.id}
								className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
								<div className="flex flex-col items-center py-10 px-10">
									<div
										className="relative mb-3 h-24 w-24 overflow-hidden rounded-full shadow-lg bg-white">
										<Image layout="fill" src={user.image} alt={user.name}/>
									</div>
									<h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
										<a href={`/users/${user.id}`}>{user.name}</a>
									</h5>
									<span
										className="text-sm text-gray-500 dark:text-gray-400">Placeholder for aesthetic</span>
									<div className="flex mt-4 space-x-3 md:mt-6">
										{!isFriend && (
											<button
												onClick={() => sendRequest(user.id)}
												className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
												Send Friend Request
											</button>
										)}
										{isFriend && (
											<div
												className="inline-flex items-center py-2 px-4 text-sm font-medium text-center cursor-default text-gray-900 rounded-lg border border-gray-300 bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:text-white dark:bg-gray-700 dark:border-gray-700 dark:focus:ring-gray-700">
												Request Pending / Accepted
											</div>
										)}
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</main>
		</>
	)
}

export const getServerSideProps = requireAuthentication()

export default Users
