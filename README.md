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

Rename `.env.dev` to `.env` (or create a new env file) in the root of the project and add necessary fill up the variables. Then, initialize the database by running the following command:

```bash
npx prisma migrate dev --name init
```

Finally, run the development server:

```bash
npm run dev
```