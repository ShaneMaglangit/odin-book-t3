import Button from './common/button'

const PostBox = () => {
	return (
		<form className={'w-full'} method="POST" action={'/api/post'}>
			<div
				className="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
				<div className="p-4 bg-white rounded-t-lg dark:bg-gray-800">
					<label htmlFor="comment" className="sr-only">Your comment</label>
					<textarea id="content" rows={4}
										name="content"
										className="px-0 w-full text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 focus:outline-none"
										placeholder="Write a comment..." required={true}></textarea>
				</div>
				<div className="flex justify-start items-center py-2 px-3 border-t dark:border-gray-600">
					<Button type="submit">Post comment </Button>
				</div>
			</div>
		</form>
	)
}

export default PostBox