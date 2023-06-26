/*
  Warnings:

  - You are about to drop the column `accountType` on the `deliveries` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "deliveries" DROP COLUMN "accountType";

-- AlterTable
ALTER TABLE "deliveryman" ADD COLUMN     "accountType" TEXT NOT NULL DEFAULT 'Deliverymans';
