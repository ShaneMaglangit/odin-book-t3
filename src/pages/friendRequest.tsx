import Head from 'next/head'
import Navbar from '../components/common/navbar'
import requireAuthentication from '../server/common/requireAuthentication'
import {useQuery} from 'react-query'
import Image from 'next/image'
import {FriendRequest} from '../types/friendRequest'

const FriendRequest = () => {
	const {
		data: requests,
		refetch
	} = useQuery<FriendRequest[]>('requests', () => fetch(`/api/requests`).then(res => res.json()))

	const respondToRequest = (requestId: string, accept: boolean) => {
		fetch(`/api/requests/${requestId}?accept=${accept}`, {method: 'PUT'}).then(() => refetch())
	}

	return (
		<>
			<Head>
				<title>Friend Requests | Odin Project T3</title>
				<meta name="description" content="Directory of users of the Odin Book Porject"/>
				<link rel="icon" href="/favicon.ico"/>
			</Head>
			<Navbar/>
			<main className="bg-gray-600 min-h-screen">
				<div
					className="container mx-auto max-w-7xl flex flex-col items-center justify-start min-h-screen py-4 px-8">
					{requests?.map(request => (
						<div key={request.id}
								 className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
							<div className="flex flex-col items-center py-10 px-10">
								<div
									className="relative mb-3 h-24 w-24 overflow-hidden rounded-full shadow-lg bg-white">
									<Image layout="fill" src={request.friend.image} alt={request.friend.name}/>
								</div>
								<h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{request.friend.name}</h5>
								<span
									className="text-sm text-gray-500 dark:text-gray-400">Asks to be your friend</span>
								<div className="flex mt-4 space-x-3 md:mt-6">
									<button
										onClick={() => respondToRequest(request.id, true)}
										className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
										Accept Requests
									</button>
									<button
										onClick={() => respondToRequest(request.id, false)}
										className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Decline
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</main>
		</>
	)
}

export const getServerSideProps = requireAuthentication()

export default FriendRequest
