-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('BASE', 'UNLIMITED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "workspaceId" TEXT;

-- CreateTable
CREATE TABLE "WorkSpace" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "companyEmail" TEXT NOT NULL,
    "companyPhone" TEXT NOT NULL,

    CONSTRAINT "WorkSpace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "companyEmail" TEXT NOT NULL,
    "companyPhone" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "plan" "Plan",
    "price" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "priceId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "currentPeriodEndDate" TIMESTAMP(3) NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "workspaceId" TEXT,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Project_workspaceId_idx" ON "Project"("workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_subscriptionId_key" ON "Subscription"("subscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_workspaceId_key" ON "Subscription"("workspaceId");

-- CreateIndex
CREATE INDEX "Subscription_customerId_idx" ON "Subscription"("customerId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "WorkSpace"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "WorkSpace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "WorkSpace"("id") ON DELETE SET NULL ON UPDATE CASCADE;
