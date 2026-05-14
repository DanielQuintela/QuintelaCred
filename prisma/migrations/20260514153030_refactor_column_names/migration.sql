/*
  Warnings:

  - You are about to drop the column `bankName` on the `Tax` table. All the data in the column will be lost.
  - You are about to drop the column `cardFlag` on the `Tax` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Tax` table. All the data in the column will be lost.
  - You are about to drop the column `installmentsNumber` on the `Tax` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Tax` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `card_flag` to the `Tax` table without a default value. This is not possible if the table is not empty.
  - Added the required column `installments_number` to the `Tax` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `Tax` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tax"
RENAME COLUMN "bankName" TO "bank_name";

ALTER TABLE "Tax"
RENAME COLUMN "cardFlag" TO "card_flag";

ALTER TABLE "Tax"
RENAME COLUMN "createdAt" TO "create_at";

ALTER TABLE "Tax"
RENAME COLUMN "installmentsNumber" TO "installments_number";

ALTER TABLE "Tax"
RENAME COLUMN "updatedAt" TO "update_at";

-- =========================
-- USER
-- =========================

ALTER TABLE "User"
RENAME COLUMN "createdAt" TO "create_at";

ALTER TABLE "User"
RENAME COLUMN "updatedAt" TO "update_at";