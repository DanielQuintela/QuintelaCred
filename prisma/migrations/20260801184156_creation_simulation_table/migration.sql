-- CreateEnum
CREATE TYPE "SimulationStatus" AS ENUM ('SIMULATED', 'CONVERTED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Simulation" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "amount" DECIMAL(10,2) NOT NULL,
    "card_flag" "CardFlag" NOT NULL,
    "type" "TaxType" NOT NULL,
    "bank_name" TEXT,
    "installments_number" INTEGER NOT NULL,
    "status" "SimulationStatus" NOT NULL DEFAULT 'SIMULATED',
    "tax_percentage" DECIMAL(10,5) NOT NULL,
    "receivedAmount" DECIMAL(10,2) NOT NULL,
    "installment_amount" DECIMAL(10,2) NOT NULL,
    "received_amount" DECIMAL(10,2) NOT NULL,
    "card_amount" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Simulation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Simulation_user_id_idx" ON "Simulation"("user_id");

-- CreateIndex
CREATE INDEX "Simulation_status_idx" ON "Simulation"("status");

-- CreateIndex
CREATE INDEX "Simulation_created_at_idx" ON "Simulation"("created_at");

-- CreateIndex
CREATE INDEX "Simulation_card_flag_idx" ON "Simulation"("card_flag");

-- CreateIndex
CREATE INDEX "Simulation_type_idx" ON "Simulation"("type");

-- CreateIndex
CREATE INDEX "Simulation_status_created_at_idx" ON "Simulation"("status", "created_at");
