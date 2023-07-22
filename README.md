<div align="center">
  <h2>⚡️ Nest.js + Next.js + Prisma Monorepo Starter</h2>
  <p>Made by <a href="https://twitter.com/asyncninja">Tapan Rai</a></p>
</div>

## Features

This is a monorepo repository with:

- ⚡️ Next.js 13 with App Router
- 🪺 Nest.js 10
- ⚛️ React 18
- ▲ Prisma with Postgres
- 🛡️ NextAuth.js with Google
- 💨 Tailwind CSS 3
- ⎙ @shadcn/ui components
- 📏 ESLint
- 💖 Prettier

## Running locally

1. Install dependencies

```bash
yarn
```

1. Copy `.env.example` to `.env.local` and update the variables.

```bash
cp ./apps/web/.env.example ./apps/web/.env.local
```

3. Run the project locally

```bash
yarn dev
```

## Environment variables

This is an exhaustive list of all the environment variables in the project

1. App: `NEXT_PUBLIC_APP_URL` - The is the URL of your application, make sure to append `https://` to your domain. In local dev mode, you can set this variable in `env.local / env.development` and give it this value `http://localhost:3000`.
2. Auth: `NEXTAUTH_URL` - When deploying to vercel **you do not have to set this value**, but when you develop you can set this as `http://localhost:3000`. Find more details [here](https://next-auth.js.org/configuration/options#nextauth_url).
3. Auth: `NEXTAUTH_SECRET` - Used to encrypt JWT and you can easily generate a secret using `openssl rand -base64 32`. Find more details [here](https://next-auth.js.org/configuration/options#nextauth_secret).
4. Google OAuth: `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` - Both Client ID and Client Secret of Google App can be generated at your [Google Cloud Console](https://console.cloud.google.com/apis/credentials) page. You can provide your `NEXT_PUBLIC_APP_URL` as the Homepage URL and append `/api/auth/callback/google` for the callback URL
5. Postgres: `POSTGRES_PRISMA_URL` & `POSTGRES_URL_NON_POOLING` - You will only need these two variables after you have setup your database as we are using Prisma.