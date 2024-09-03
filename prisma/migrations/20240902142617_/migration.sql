-- CreateTable
CREATE TABLE "RevenueCatId" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "rc_id" TEXT NOT NULL,

    CONSTRAINT "RevenueCatId_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RevenueCatId_user_id_key" ON "RevenueCatId"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "RevenueCatId_rc_id_key" ON "RevenueCatId"("rc_id");

-- AddForeignKey
ALTER TABLE "RevenueCatId" ADD CONSTRAINT "RevenueCatId_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
