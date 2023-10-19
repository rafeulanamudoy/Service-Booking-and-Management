/*
  Warnings:

  - Changed the type of `dimention` on the `BookingModel` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "BookingModel" DROP COLUMN "dimention",
ADD COLUMN     "dimention" JSONB NOT NULL;
