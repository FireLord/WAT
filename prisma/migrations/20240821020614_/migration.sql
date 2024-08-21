-- CreateTable
CREATE TABLE "BugReports" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "BugReports_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BugReports" ADD CONSTRAINT "BugReports_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
