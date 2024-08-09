/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Otp` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Otp_user_id_key" ON "Otp"("user_id");
