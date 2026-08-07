-- AlterEnum
ALTER TYPE "CardFlag" ADD VALUE 'VISAMASTER';
ALTER TYPE "CardFlag" ADD VALUE 'ELODEMAISBANDEIRAS';

-- AlterTable Simulation
ALTER TABLE "Simulation" DROP COLUMN "receivedAmount",
ADD COLUMN     "location_id" TEXT;

-- AlterTable Tax (Adiciona colunas com default temporário)
ALTER TABLE "Tax" 
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "location_id" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Copia os dados legados para as novas colunas
UPDATE "Tax" SET "created_at" = "create_at", "updated_at" = "update_at";

-- Remove as colunas antigas
ALTER TABLE "Tax" 
DROP COLUMN "create_at",
DROP COLUMN "update_at";

-- AlterTable User (Adiciona colunas com default temporário)
ALTER TABLE "User" 
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Copia os dados legados para as novas colunas
UPDATE "User" SET "created_at" = "create_at", "updated_at" = "update_at";

-- Remove as colunas antigas
ALTER TABLE "User" 
DROP COLUMN "create_at",
DROP COLUMN "update_at";

-- CreateTable Location
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT,
    "state" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_city_key" ON "Location"("name", "city");

-- AddForeignKey
ALTER TABLE "Tax" ADD CONSTRAINT "Tax_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Simulation" ADD CONSTRAINT "Simulation_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;