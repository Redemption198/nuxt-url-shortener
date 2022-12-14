# Nuxt Url Shortener

A [Nuxt 3](https://v3.nuxtjs.org) and [Prisma](https://www.prisma.io/) url shortener.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Environment variables

Create an `.env` file and setup the following variables:

```
DATABASE_URL="file:./db/dev.db"
JWT_SECRET=<your_secret_key>
```

## Setting up Prisma

Prisma config is available inside `prisma/schema.prisma`. Prisma docs available [here](https://www.prisma.io/docs/).

Initialize the database with Prisma by running `npx prisma migrate dev --name init`.

## Changing the domain

The domain can be changed inside `nuxt.config.ts` by editing:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            domain: "http://localhost:3000/",
        },
    },
});
```
## Securing the app

This app uses the [Nuxt Security](https://github.com/Baroshem/nuxt-security) module with its default values.
Module documentation is available [here](https://nuxt-security.vercel.app/).

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.
