/*
  Warnings:

  - You are about to drop the `BookModel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BookModel" DROP CONSTRAINT "BookModel_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "BookModel" DROP CONSTRAINT "BookModel_userId_fkey";

-- DropTable
DROP TABLE "BookModel";

-- CreateTable
CREATE TABLE "BookingModel" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "dimention" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "timeSlot" TEXT NOT NULL,
    "colorScheme" TEXT,
    "location" TEXT NOT NULL,
    "bookingStatus" "BookingStatus" NOT NULL DEFAULT 'pending',

    CONSTRAINT "BookingModel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookingModel" ADD CONSTRAINT "BookingModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingModel" ADD CONSTRAINT "BookingModel_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
