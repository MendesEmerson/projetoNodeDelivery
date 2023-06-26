-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_cartId_fkey";

-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "finish" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;
