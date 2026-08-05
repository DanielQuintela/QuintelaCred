import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

// Cria o pool de conexões usando o pacote 'pg'
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

// Passa a instância do Pool para o adaptador do Prisma
const adapter = new PrismaPg(pool);

// Reaproveita a mesma instância em recargas do Serverless
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;