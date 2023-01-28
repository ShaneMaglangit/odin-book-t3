import React from 'react'

const MainContent = ({children}: { children: React.ReactNode }) => (
	<main className="bg-gray-600 min-h-screen">
		<div className="container mx-auto max-w-7xl flex flex-col items-center justify-start min-h-screen py-4 px-8">
			{children}
		</div>
	</main>
)

export default MainContent