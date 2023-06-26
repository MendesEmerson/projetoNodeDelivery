-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_cartId_fkey";

-- CreateTable
CREATE TABLE "_CartToItems" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CartToItems_AB_unique" ON "_CartToItems"("A", "B");

-- CreateIndex
CREATE INDEX "_CartToItems_B_index" ON "_CartToItems"("B");

-- AddForeignKey
ALTER TABLE "_CartToItems" ADD CONSTRAINT "_CartToItems_A_fkey" FOREIGN KEY ("A") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartToItems" ADD CONSTRAINT "_CartToItems_B_fkey" FOREIGN KEY ("B") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
