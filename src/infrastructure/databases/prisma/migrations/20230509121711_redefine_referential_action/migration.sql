-- DropForeignKey
ALTER TABLE `Color` DROP FOREIGN KEY `Color_userEmail_fkey`;

-- DropForeignKey
ALTER TABLE `ColorsOnProducts` DROP FOREIGN KEY `ColorsOnProducts_colorId_fkey`;

-- DropForeignKey
ALTER TABLE `ColorsOnProducts` DROP FOREIGN KEY `ColorsOnProducts_productId_fkey`;

-- DropForeignKey
ALTER TABLE `ColorsOnProducts` DROP FOREIGN KEY `ColorsOnProducts_userEmail_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_userEmail_fkey`;

-- DropForeignKey
ALTER TABLE `Size` DROP FOREIGN KEY `Size_productId_fkey`;

-- DropForeignKey
ALTER TABLE `Size` DROP FOREIGN KEY `Size_userEmail_fkey`;

-- DropForeignKey
ALTER TABLE `Token` DROP FOREIGN KEY `Token_userEmail_fkey`;

-- DropForeignKey
ALTER TABLE `UsedToken` DROP FOREIGN KEY `UsedToken_userEmail_fkey`;

-- AlterTable
ALTER TABLE `Color` MODIFY `userEmail` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ColorsOnProducts` MODIFY `userEmail` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Product` MODIFY `userEmail` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Size` MODIFY `userEmail` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `Token_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsedToken` ADD CONSTRAINT `UsedToken_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Color` ADD CONSTRAINT `Color_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ColorsOnProducts` ADD CONSTRAINT `ColorsOnProducts_colorId_fkey` FOREIGN KEY (`colorId`) REFERENCES `Color`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ColorsOnProducts` ADD CONSTRAINT `ColorsOnProducts_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ColorsOnProducts` ADD CONSTRAINT `ColorsOnProducts_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Size` ADD CONSTRAINT `Size_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Size` ADD CONSTRAINT `Size_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
