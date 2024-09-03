/*
  Warnings:

  - You are about to drop the column `amount` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `ref_id` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Transaction_ref_id_key";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "amount",
DROP COLUMN "date",
DROP COLUMN "ref_id",
ADD COLUMN     "app_user_id" TEXT,
ADD COLUMN     "commission_percentage" DOUBLE PRECISION,
ADD COLUMN     "country_code" TEXT,
ADD COLUMN     "currency" TEXT,
ADD COLUMN     "environment" TEXT,
ADD COLUMN     "event_timestamp" BIGINT,
ADD COLUMN     "expiration_at" BIGINT,
ADD COLUMN     "is_trial_conversion" BOOLEAN,
ADD COLUMN     "offer_code" TEXT,
ADD COLUMN     "original_app_user_id" TEXT,
ADD COLUMN     "original_transaction_id" TEXT,
ADD COLUMN     "period_type" TEXT,
ADD COLUMN     "presented_offering_id" TEXT,
ADD COLUMN     "price" DOUBLE PRECISION,
ADD COLUMN     "price_in_purchased_currency" DOUBLE PRECISION,
ADD COLUMN     "product_id" TEXT,
ADD COLUMN     "purchased_at" BIGINT,
ADD COLUMN     "renewal_number" INTEGER,
ADD COLUMN     "store" TEXT,
ADD COLUMN     "takehome_percentage" DOUBLE PRECISION,
ADD COLUMN     "tax_percentage" DOUBLE PRECISION,
ADD COLUMN     "transaction_id" TEXT,
ADD COLUMN     "type" TEXT,
ALTER COLUMN "status" DROP NOT NULL;
