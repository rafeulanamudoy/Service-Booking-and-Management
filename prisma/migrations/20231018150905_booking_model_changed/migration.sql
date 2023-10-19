/*
  Warnings:

  - Added the required column `userRequerment` to the `BookingModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookingModel" ADD COLUMN     "userRequerment" TEXT NOT NULL;
