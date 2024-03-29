import {GetServerSidePropsContext, NextPage} from 'next'
import {signIn} from 'next-auth/react'
import {getServerAuthSession} from '../server/common/getServerAuthSession'
import Image from 'next/image'
import logo from '../../public/logo.svg'
import Head from 'next/head'

const SignIn: NextPage = () => (
	<>
		<Head>
			<title>Odin Project T3</title>
			<meta name="description" content="Based on the Odin Project built with typesafe libraries and frameworks"/>
			<link rel="icon" href="/favicon.ico"/>
		</Head>
		<div className="flex h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="w-full max-w-md space-y-8">
				<div className="flex flex-col items-center">
					<Image className="mx-auto h-12 w-auto" height={56} width={48} src={logo} alt="Odin Project"/>
					<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your
						account</h2>
				</div>
				<button type="button"
								onClick={() => signIn('github')}
								className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
																 xmlns="http://www.w3.org/2000/svg"
																 viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd"
																			d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
																			clipRule="evenodd"/>
                            </svg>
                        </span>
					Sign in with GitHub
				</button>
			</div>
		</div>
	</>
)

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
	const session = await getServerAuthSession(context)
	return session ? {redirect: {destination: '/'}} : {props: {}}
}

export default SignIn