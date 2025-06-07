FROM node:20-alpine AS base

RUN npm install -g pnpm

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

ARG BETTER_AUTH_SECRET
ENV BETTER_AUTH_SECRET=${BETTER_AUTH_SECRET}

ARG BETTER_AUTH_URL
ENV BETTER_AUTH_URL=${BETTER_AUTH_URL}

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN pnpm install

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm install

RUN pnpm build

FROM base AS runner
WORKDIR /app

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

ARG BETTER_AUTH_SECRET
ENV BETTER_AUTH_SECRET=${BETTER_AUTH_SECRET}

ARG BETTER_AUTH_URL
ENV BETTER_AUTH_URL=${BETTER_AUTH_URL}

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN pnpm run auth-migrate
CMD ["node", "server.js"] 