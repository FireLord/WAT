/*
  Warnings:

  - The `ph_number` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "ph_number",
ADD COLUMN     "ph_number" INTEGER;
