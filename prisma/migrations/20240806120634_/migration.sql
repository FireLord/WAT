/*
  Warnings:

  - Added the required column `type` to the `Template` table without a default value. This is not possible if the table is not empty.
  - Added the required column `welcome_msg_only` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Template_type" AS ENUM ('EXACT', 'SIMILAR', 'EXPERT');

-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "regex" TEXT,
ADD COLUMN     "type" "Template_type" NOT NULL,
ADD COLUMN     "welcome_msg_only" BOOLEAN NOT NULL;
