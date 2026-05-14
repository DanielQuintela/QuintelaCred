-- CreateEnum
CREATE TYPE "LogAction" AS ENUM ('CREATE', 'UPDATE', 'DELETE');

-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "table_name" TEXT NOT NULL,
    "record_id" TEXT NOT NULL,
    "user_id" TEXT,
    "action" "LogAction" NOT NULL,
    "old_values" JSONB,
    "new_values" JSONB,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Log_table_name_idx" ON "Log"("table_name");

-- CreateIndex
CREATE INDEX "Log_record_id_idx" ON "Log"("record_id");

-- CreateIndex
CREATE INDEX "Log_user_id_idx" ON "Log"("user_id");

-- CreateIndex
CREATE INDEX "Log_timestamp_idx" ON "Log"("timestamp");
