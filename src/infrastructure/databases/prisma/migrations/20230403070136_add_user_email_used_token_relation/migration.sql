/*
  Warnings:

  - A unique constraint covering the columns `[userEmail]` on the table `UsedToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userEmail` to the `UsedToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `UsedToken` ADD COLUMN `userEmail` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `UsedToken_userEmail_key` ON `UsedToken`(`userEmail`);

-- AddForeignKey
ALTER TABLE `UsedToken` ADD CONSTRAINT `UsedToken_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
