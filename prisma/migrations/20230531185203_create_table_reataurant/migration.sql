-- CreateTable
CREATE TABLE "restaurants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "restaurantsId" TEXT,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "restaurants_username_key" ON "restaurants"("username");

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_restaurantsId_fkey" FOREIGN KEY ("restaurantsId") REFERENCES "restaurants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
