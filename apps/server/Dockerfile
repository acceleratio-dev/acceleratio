FROM node:20-alpine AS base

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

FROM base AS deps
RUN pnpm install

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm run build

FROM node:20-alpine AS production

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod

COPY --from=build /app/dist ./dist

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

RUN chown -R nestjs:nodejs /app
USER nestjs

EXPOSE 8080

CMD ["node", "dist/main"]