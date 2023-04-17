-- CreateTable
CREATE TABLE `ColorsOnProducts` (
    `colorId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userEmail` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`colorId`, `productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ColorsOnProducts` ADD CONSTRAINT `ColorsOnProducts_colorId_fkey` FOREIGN KEY (`colorId`) REFERENCES `Color`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ColorsOnProducts` ADD CONSTRAINT `ColorsOnProducts_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ColorsOnProducts` ADD CONSTRAINT `ColorsOnProducts_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
