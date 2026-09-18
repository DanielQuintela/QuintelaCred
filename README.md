# QuintelaCred

API desenvolvida para cálculo de simulação de taxas, autenticação de usuários e gestão de regras de negócio relacionadas a crédito e parcelamento.

## Visão geral

O projeto expõe uma API REST em Node.js com TypeScript, utilizando Prisma e PostgreSQL para persistência e autenticação via JWT. A estrutura foi organizada em módulos para separar responsabilidades de negócio, como autenticação, usuários, simulações, taxas e localidades.

## Stack

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- JWT
- Zod

## Estrutura principal

```bash
src/
  app.ts
  server.ts
  routes/
  middlewares/
  modules/
    auth/
    users/
    tax/
    location/
    simulation/
  infra/
  services/
prisma/
  schema.prisma
  migrations/
```

## Requisitos

- Node.js 18+
- PostgreSQL
- npm
stalação

```bash
npm install
```

## Banco de dados

```bash
npx prisma migrate dev
```

## Execução

```bash
npm run dev
```

A API ficará disponível em:

```bash
http://localhost:8080
```

## Scripts

```bash
npm run dev
npm run build
npm start
npm run dbsync
```

## Endpoints principais

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/user`
- `POST /simulation`
- rotas de usuários, taxas e localidades conforme módulos do projeto

## Status

Projeto em desenvolvimento pessoal, com foco em estrutura de API, regras de negócio e integração com banco relacional.
