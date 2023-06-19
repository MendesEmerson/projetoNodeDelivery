/*
  Warnings:

  - Added the required column `description` to the `restaurants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "restaurants" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "isOpen" BOOLEAN NOT NULL DEFAULT false;
