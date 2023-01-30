import {useState} from 'react'
import {NavItem} from '../../types/navItem'
import {useRouter} from 'next/router'
import Image from 'next/image'
import logo from '../../../public/logo.svg'
import {useSession} from 'next-auth/react'
import Link from 'next/link'

const Navbar = () => {
	// State for closing/opening secondary menu
	const [dropdownActive, setDropdownActive] = useState(false)

	// Router to be used for matching the current URL with the navigation items
	const router = useRouter()

	// Get current session
	const {data: session} = useSession()

	// Primary navigation items
	const navItems: NavItem[] = [
		{name: 'Feed', slug: '/'},
		{name: 'Users', slug: '/users'},
		{name: 'Friend Requests', slug: '/users/requests'},
	]

	return (
		<nav className="bg-gray-800">
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center justify-between">
					<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
						<button type="button"
										className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
										aria-controls="mobile-menu" aria-expanded="false">
							<span className="sr-only">Open main menu</span>
							<svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
									 viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
								<path strokeLinecap="round" strokeLinejoin="round"
											d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
							</svg>
							<svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
									 viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
							</svg>
						</button>
					</div>
					<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
						<a href={'/'} className="flex flex-shrink-0 items-center">
							<Image className="block h-8 w-auto" src={logo} alt="Your Company"/>
						</a>
						<div className="hidden sm:ml-6 sm:block">
							<div className="flex space-x-4">
								{navItems.map(item => {
									const isActivePage = item.slug === router.pathname
									const className = isActivePage ?
										'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium' :
										'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
									return <a key={item.slug} href={item.slug} className={className}
														aria-current={isActivePage && 'page'}>{item.name}</a>
								})}
							</div>
						</div>
					</div>
					<div
						className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
						<div className="relative ml-3">
							<div>
								<button type="button"
												onClick={() => setDropdownActive(!dropdownActive)}
												className="h-8 w-8 flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
												id="user-menu-button" aria-expanded="false" aria-haspopup="true">
									<span className="sr-only">Open user menu</span>
									{session?.user?.image &&
										<Image className="rounded-full bg-gray-500"
                           src={session.user.image}
                           alt="profile photo"
                           layout="fill"/>
									}
								</button>
								{dropdownActive && (
									<div
										className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
										role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button"
										tabIndex={-1}>

										<a href={`/users/${session?.user?.id}`}
											 className="block px-4 py-2 text-sm text-gray-700" role="menuitem"
											 tabIndex={-1} id="user-menu-item-0">Your Profile</a>
										<Link href="/api/auth/signout" role="menuitem">
											<span className="cursor-pointer block px-4 py-2 text-sm text-gray-700"
														tabIndex={-1} id="user-menu-item-2">Sign out</span>
										</Link>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="sm:hidden" id="mobile-menu">
				<div className="space-y-1 px-2 pt-2 pb-3">
					{navItems.map(item => {
						const isActivePage = item.slug === router.pathname
						const className = isActivePage ?
							'bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium' :
							'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
						return <a key={item.slug} href={item.slug} className={className}
											aria-current={isActivePage && 'page'}>{item.name}</a>
					})}
				</div>
			</div>
		</nav>
	)
}

export default Navbar