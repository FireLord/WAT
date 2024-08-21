/*
  Warnings:

  - You are about to drop the column `user_id` on the `BugReports` table. All the data in the column will be lost.
  - Added the required column `email` to the `BugReports` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BugReports" DROP CONSTRAINT "BugReports_user_id_fkey";

-- AlterTable
ALTER TABLE "BugReports" DROP COLUMN "user_id",
ADD COLUMN     "email" TEXT NOT NULL;
