/*
  Warnings:

  - You are about to drop the column `canceledAt` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `currentPeriodEnd` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `currentPeriodStart` on the `Subscription` table. All the data in the column will be lost.
  - The `interval` column on the `Subscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `planType` column on the `Subscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('STARTER', 'PRO');

-- CreateEnum
CREATE TYPE "BillingInterval" AS ENUM ('MONTH', 'YEAR');

-- DropIndex
DROP INDEX "Subscription_stripeCustomerId_key";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "canceledAt",
DROP COLUMN "currentPeriodEnd",
DROP COLUMN "currentPeriodStart",
ALTER COLUMN "isActive" SET DEFAULT true,
DROP COLUMN "interval",
ADD COLUMN     "interval" "BillingInterval" NOT NULL DEFAULT 'MONTH',
DROP COLUMN "planType",
ADD COLUMN     "planType" "PlanType" NOT NULL DEFAULT 'STARTER';

-- CreateIndex
CREATE INDEX "Subscription_userId_idx" ON "Subscription"("userId");
