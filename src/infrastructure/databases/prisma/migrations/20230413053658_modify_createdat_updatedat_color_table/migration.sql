-- AlterTable
ALTER TABLE `Color` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Product` ALTER COLUMN `createdAt` DROP DEFAULT;
