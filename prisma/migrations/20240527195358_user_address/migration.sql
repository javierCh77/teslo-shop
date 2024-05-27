/*
  Warnings:

  - You are about to drop the column `firstNAme` on the `UserAddress` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `UserAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAddress" DROP COLUMN "firstNAme",
ADD COLUMN     "firstName" TEXT NOT NULL;
