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

```
// .env

DATABASE_URL="file:./db/dev.db"
JWT_SECRET=<your_secret_key>
```

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
