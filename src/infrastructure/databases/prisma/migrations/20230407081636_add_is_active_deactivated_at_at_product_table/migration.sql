/*
  Warnings:

  - Added the required column `deactivatedAt` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isActive` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `deactivatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `isActive` BOOLEAN NOT NULL;
