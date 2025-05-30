FROM oven/bun:1 AS base

WORKDIR /app

COPY package.json bun.lock ./

FROM base AS deps
RUN bun install --frozen-lockfile

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG API_URL
ENV API_URL=${API_URL}

RUN bun run build

FROM oven/bun:1 AS production

WORKDIR /app

ENV NODE_ENV=production
ARG API_URL
ENV API_URL=${API_URL}

COPY package.json bun.lock ./

RUN bun install --production --frozen-lockfile

COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

CMD ["bun", "run", "start"]