-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "accountType" TEXT NOT NULL DEFAULT 'Clients';

-- AlterTable
ALTER TABLE "deliveries" ADD COLUMN     "accountType" TEXT NOT NULL DEFAULT 'Deliveryman';

-- AlterTable
ALTER TABLE "restaurants" ADD COLUMN     "accountType" TEXT NOT NULL DEFAULT 'Restaurants';
