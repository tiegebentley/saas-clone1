-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "interval" TEXT NOT NULL DEFAULT 'month',
ADD COLUMN     "planType" TEXT NOT NULL DEFAULT 'default';
