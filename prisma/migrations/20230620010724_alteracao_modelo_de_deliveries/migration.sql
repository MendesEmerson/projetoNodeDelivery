/*
  Warnings:

  - You are about to drop the column `item_name` on the `deliveries` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cartId]` on the table `deliveries` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "deliveries" DROP COLUMN "item_name",
ADD COLUMN     "cartId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "deliveries_cartId_key" ON "deliveries"("cartId");

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;
