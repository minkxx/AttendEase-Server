# AttendEase Server

> [!WARNING]
>
> This project is in early development and not yet functional.

High-performance, multi-tenant academic attendance management API built with NestJS, Prisma ORM, and PostgreSQL. Features real-time consensus polling via WebSockets and Redis Pub/Sub, automated geofenced validation, and predictive analytics to optimize student attendance compliance thresholds.

### Setup

1. Clone this repo

```bash
git clone https://github.com/monsurcodes/AttendEase-Server.git

cd AttendEase-Server
```

2. Install `pnpm` package manager

```bash
npm install -g pnpm@latest

pnpm -v
```

3. Install all the required packages

```bash
pnpm i
```

4. Create `.env` file and fill out all the secrets required

```bash
cp .env.exmaple .env # linux

copy .env.exmaple .env # windows
```

5. Spin up the docker container

```bash
docker compose up -d
```

6. Create db migration

```bash
pnpm dlx prisma migrate dev --name init
```

7. Generate Prisma Client

```bash
pnpm dlx prisma generate
```

8. Start the `dev` server

```bash
pnpm start:dev
```
