/*
  Warnings:

  - You are about to alter the column `value` on the `Tax` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,5)`.
  - Changed the type of `cardFlag` on the `Tax` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `Tax` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CardFlag" AS ENUM ('MASTER', 'VISA', 'ELO', 'AMEX', 'DINERS', 'HIPERCARD', 'OUTROS');

-- CreateEnum
CREATE TYPE "TaxType" AS ENUM ('LIBERADO', 'LIMITE');

-- AlterTable
ALTER TABLE "Tax" ADD COLUMN     "bankName" TEXT,
ALTER COLUMN "value" SET DATA TYPE DECIMAL(10,5),
DROP COLUMN "cardFlag",
ADD COLUMN     "cardFlag" "CardFlag" NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "TaxType" NOT NULL;
