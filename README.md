# PTNK Library - Backend

Tech stack 
- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

## Yêu cầu và hướng dẫn cài đặt:
- [NodeJS 22 (LTS)](https://nodejs.org/en)
- [Yarn 4.9.x (stable)](https://yarnpkg.com/getting-started/install)
- [Docker Desktop](https://docs.docker.com/desktop/)

## Project setup

```bash
git clone https://github.com/bmin-mit/PTNK-Library-BE

cd PTNK-Library-BE
yarn
```

## Docker

### Setup PostgreSQL cho lần đầu sử dụng

```bash
docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=password postgres
docker exec -it postgres bash
psql -U postgres # Nhập password là `password`
```

Trong prompt của `psql` tạo database cho ứng dụng:

```postgresql
CREATE DATABASE "ptnk-library";
```

Ở những lần tiếp theo, chỉ cần khởi chạy container `postgres` đã tạo thông qua Docker Desktop

## Build và run production

```bash
yarn build
yarn run start:prod
```

Server sẽ được khởi chạy ở http://localhost:5001

Tài khoản mặc định của admin là:
- Email: `admin@system.com`
- Password: `password`

## Documentation

- Swagger API Reference: [http://localhost:5001/swagger](http://localhost:5001/swagger)
