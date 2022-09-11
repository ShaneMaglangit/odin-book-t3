# Odin Book T3

Attempt towards the [Odin Book Project](https://www.theodinproject.com/lessons/nodejs-odin-book)

This is an app bootstrapped according to the [init.tips](https://init.tips) stack, also known as the T3-Stack.

- [Next-Auth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [TailwindCSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Rebuild Locally

Clone the repo and run `npm install` to install dependencies.

```bash
git clone <url_of_this_repo>
cd <repo_name>
npm install
```

Rename `.env.dev` to `.env` (or create a new env file) in the root of the project and add necessary fill up the variables. 

```bash
# NOTE: This might not be in sync with the latest .env.dev file.
# Prisma
DATABASE_URL=

# Next Auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# NextAuth Facebook Provider
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

Then, initialize the database by running the following command:

```bash
npx prisma migrate dev --name init
```

Finally, run the development server:

```bash
npm run dev
```

## Task List

- [x]  Users must sign in to see anything except the sign in page.
- [x]  Users should be able to sign in using ~~their real facebook details~~ GitHub OAuth (Feel free to replace it with Facebook).
- [ ]  Users can send friend requests to other users.
- [ ]  A user must accept the friend request to become friends.
- [x]  Users can create posts. (begin with text only)
- [ ]  Users can like posts.
- [ ]  Users can comment on posts.
- [ ]  Posts should always display with the post content, author, comments and likes.
- [ ]  Treat the Posts index page like the real Facebook’s “Timeline” feature – show all the recent posts from the current user and users she is friends with.
- [ ]  Users can create Profile with a photo (you can get this from the real facebook when you sign in using passport)
- [ ]  The User Show page contains their profile information, profile photo and posts.
- [ ]  The Users Index page lists all users and buttons for sending friend requests to those who are not already friends or who don’t already have a pending request.