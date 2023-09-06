-- CreateTable
CREATE TABLE `PrintMethod` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `printMethodName` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `userEmail` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `deactivatedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PrintMethod` ADD CONSTRAINT `PrintMethod_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE SET NULL ON UPDATE CASCADE;
