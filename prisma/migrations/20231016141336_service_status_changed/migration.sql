/*
  Warnings:

  - The values [booked] on the enum `ServiceStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ServiceStatus_new" AS ENUM ('available', 'upcoming', 'unavailable');
ALTER TABLE "Service" ALTER COLUMN "serviceStatus" TYPE "ServiceStatus_new" USING ("serviceStatus"::text::"ServiceStatus_new");
ALTER TYPE "ServiceStatus" RENAME TO "ServiceStatus_old";
ALTER TYPE "ServiceStatus_new" RENAME TO "ServiceStatus";
DROP TYPE "ServiceStatus_old";
COMMIT;
