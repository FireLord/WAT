/*
  Warnings:

  - You are about to drop the column `delaySecond` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `regexValue` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `ruleType` on the `Template` table. All the data in the column will be lost.
  - Added the required column `rule_type` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Template" DROP COLUMN "delaySecond",
DROP COLUMN "regexValue",
DROP COLUMN "ruleType",
ADD COLUMN     "delay_second" TEXT,
ADD COLUMN     "regex_value" TEXT,
ADD COLUMN     "rule_type" TEXT NOT NULL;
