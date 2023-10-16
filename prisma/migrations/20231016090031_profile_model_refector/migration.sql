/*
  Warnings:

  - You are about to drop the column `city` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `desigNation` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `district` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `divistion` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `address` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "city",
DROP COLUMN "desigNation",
DROP COLUMN "district",
DROP COLUMN "divistion",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "postalCode",
DROP COLUMN "street",
ADD COLUMN     "address" JSONB NOT NULL,
ADD COLUMN     "name" JSONB NOT NULL;
