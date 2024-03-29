# Odin Book T3

> This was purely for exploratory purpose. Certain features may not be optimized and the webapp is unresponsive for smaller screens (nothing breakpoints can't solve).

Attempt towards the [Odin Book Project](https://www.theodinproject.com/lessons/nodejs-odin-book)

This is an app bootstrapped according to the [init.tips](https://init.tips) stack, also known as the T3-Stack.

- [Next-Auth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [TailwindCSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Rebuild Locally


Clone the repo, run `npm install` to install dependencies, and install [dotenv-cli](https://www.npmjs.com/package/dotenv-cli) globally for testing.

```bash
git clone <url_of_this_repo>
cd <repo_name>
npm install
npm i -g npm i dotenv-cli
```

Create `.env` and `.env.test` based on the schema in `.env.schema`. Fill up the fields where necessary.

```bash
# NOTE: Set a different DATABASE_URL for .env and .env.test. The latter will be used for testing.

# Prisma
DATABASE_URL=file:./db.sqlite
DATABASE_URL_TEST=file:./db.test.sqlite

# Next Auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# NextAuth Github Provider
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

Then, initialize the database by running the following command:

```bash
npm run migrate
```

Finally, run the development server:

```bash
npm run dev
```

## Task List

- [x]  Users must sign in to see anything except the sign-in page.
- [x]  Users should be able to sign in using ~~their real facebook details~~ GitHub OAuth (Feel free to replace it with Facebook).
- [x]  Users can send friend requests to other users.
- [x]  A user must accept the friend request to become friends.
- [x]  Users can create posts. (begin with text only)
- [x]  Users can like posts.
- [x]  Users can comment on posts.
- [x]  Posts should always display with the post content, author, comments and likes.
- [x]  Treat the Posts index page like the real Facebook’s “Timeline” feature – show all the recent posts from the current user and users she is friends with.
- [x]  Users can create Profile with a photo (you can get this from the real facebook when you sign in using passport)
- [x]  The User Show page contains their profile information, profile photo and posts.
- [x]  Show all users and button for sending friend requests to those who are not already friends or who don’t already have a pending request.
