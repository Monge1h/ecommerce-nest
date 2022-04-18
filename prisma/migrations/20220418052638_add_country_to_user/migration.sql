/*
  Warnings:

  - Added the required column `user_country` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "user_country" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_user_country_fkey" FOREIGN KEY ("user_country") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
