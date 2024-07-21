/*
  Warnings:

  - Added the required column `msg_body` to the `SentMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SentMessage" ADD COLUMN     "msg_body" TEXT NOT NULL;
