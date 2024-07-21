/*
  Warnings:

  - You are about to drop the column `access_token` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `total_pnl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `ChildAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MasterAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Prefrences` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChildAccount" DROP CONSTRAINT "ChildAccount_master_id_fkey";

-- DropForeignKey
ALTER TABLE "MasterAccount" DROP CONSTRAINT "MasterAccount_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Prefrences" DROP CONSTRAINT "Prefrences_child_account_id_fkey";

-- DropForeignKey
ALTER TABLE "Prefrences" DROP CONSTRAINT "Prefrences_master_account_id_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "access_token",
DROP COLUMN "photo",
DROP COLUMN "total_pnl";

-- DropTable
DROP TABLE "ChildAccount";

-- DropTable
DROP TABLE "MasterAccount";

-- DropTable
DROP TABLE "Prefrences";

-- DropEnum
DROP TYPE "AccountType";

-- DropEnum
DROP TYPE "Broker";

-- DropEnum
DROP TYPE "OrderStatus";

-- DropEnum
DROP TYPE "TransactionType";

-- CreateTable
CREATE TABLE "Template" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "preset_msg" TEXT NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SentMessage" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "firt_msg" BOOLEAN NOT NULL,
    "template_id" TEXT NOT NULL,

    CONSTRAINT "SentMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "orignal_number" INTEGER NOT NULL,
    "contact_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SentMessage" ADD CONSTRAINT "SentMessage_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SentMessage" ADD CONSTRAINT "SentMessage_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
