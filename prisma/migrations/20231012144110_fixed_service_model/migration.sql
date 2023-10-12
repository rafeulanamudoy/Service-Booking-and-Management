/*
  Warnings:

  - You are about to drop the column `BookingStatus` on the `BookModel` table. All the data in the column will be lost.
  - You are about to drop the column `Image` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `Price` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `ServiceStatus` on the `Service` table. All the data in the column will be lost.
  - Added the required column `image` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceStatus` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookModel" DROP COLUMN "BookingStatus",
ADD COLUMN     "bookingStatus" "BookingStatus" NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "Image",
DROP COLUMN "Price",
DROP COLUMN "ServiceStatus",
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "serviceStatus" "ServiceStatus" NOT NULL;
