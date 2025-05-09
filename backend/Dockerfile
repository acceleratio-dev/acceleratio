FROM oven/bun:latest

WORKDIR /app

COPY . .

EXPOSE 3000

RUN bun install

CMD ["bun", "./src/main.ts"]